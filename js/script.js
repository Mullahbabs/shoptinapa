document.addEventListener("DOMContentLoaded", function () {
  console.log("Tinapa E-Commerce JS initialized");

  // Format Naira amounts for display
  function formatNaira(amount) {
    // Round to nearest kobo (2 decimal places)
    const roundedAmount = Math.round(amount * 100) / 100;

    if (roundedAmount >= 1000000) {
      // For millions, show whole numbers
      return `₦${Math.round(roundedAmount).toLocaleString("en-NG")}`;
    } else {
      // For smaller amounts, show two decimal places
      return `₦${roundedAmount.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
  }

  // ==================== SEARCH AND FILTER SYSTEM ====================
  const searchInput = document.querySelector(".search-input");
  const searchButton = document.querySelector(".search-button");
  const priceMinInput = document.querySelector(".price-min");
  const priceMaxInput = document.querySelector(".price-max");
  const applyFilterButton = document.querySelector(".apply-filter");
  const resetFilterButton = document.querySelector(".reset-filter");
  const productGridElement = document.querySelector(".product-grid");

  // Store original product grid HTML
  if (productGridElement) {
    window.originalProductGridHTML = productGridElement.innerHTML;
  }

  // Get all products from all categories
  function getAllProducts() {
    const allProducts = [];

    // Add products from categories
    for (const category in productCategories) {
      allProducts.push(...productCategories[category]);
    }

    // Add initial products if they exist
    if (productGrid) {
      const initialProducts = [
        {
          id: 1,
          title: "Handwoven Raffia Baskets",
          vendor: "CR Crafts",
          price: 73584,
          originalPrice: 95984,
          image: "img/made2.jpg",
          rating: 4.5,
          reviews: 24,
          badge: "Popular",
        },
        {
          id: 2,
          title: "Apple Complete",
          vendor: "Gigs & Gadgets",
          price: 2400000,
          originalPrice: 2900000,
          image: "img/tgad4.jpg",
          rating: 4.5,
          reviews: 24,
          badge: "Bestseller",
        },
        {
          id: 3,
          title: "Traditional styled foodware",
          vendor: "Officepub Crafts",
          price: 32000,
          originalPrice: 35900,
          image: "img/pop3.jpg",
          rating: 4.5,
          reviews: 24,
          badge: "High Demand",
        },
        {
          id: 4,
          title: "Locally made kitchen tools",
          vendor: "CR Crafts",
          price: 73584,
          originalPrice: 95984,
          image: "img/tkitch3.jpg",
          rating: 4.5,
          reviews: 24,
          badge: "New Arrival",
        },
      ];
      allProducts.push(...initialProducts);
    }

    return allProducts;
  }

  // Search products by title, vendor or description
  function searchProducts(products, searchTerm) {
    if (!searchTerm) return products;

    const searchLower = searchTerm.toLowerCase();
    return products.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchLower) ||
        product.vendor.toLowerCase().includes(searchLower) ||
        (product.description &&
          product.description.toLowerCase().includes(searchLower))
      );
    });
  }

  // Filter products by price range
  function filterProductsByPrice(products, minPrice, maxPrice) {
    return products.filter((product) => {
      const price = product.price;
      return (
        (minPrice === "" || price >= Number(minPrice)) &&
        (maxPrice === "" || price <= Number(maxPrice))
      );
    });
  }

  // Create product card HTML
  function createProductCard(product) {
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;
    let starsHtml = "";

    for (let i = 0; i < 5; i++) {
      starsHtml +=
        i < fullStars
          ? '<i class="fas fa-star"></i>'
          : i === fullStars && hasHalfStar
          ? '<i class="fas fa-star-half-alt"></i>'
          : '<i class="far fa-star"></i>';
    }

    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      ${
        product.badge
          ? `<span class="product-badge">${product.badge}</span>`
          : ""
      }
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <button class="quick-view-btn" data-product-id="${product.id}">
          <i class="far fa-eye"></i> Quick View
        </button>
      </div>
      <div class="product-info">
        <div class="product-vendor">${product.vendor}</div>
        <h3 class="product-title">${product.title}</h3>
        <div class="rating">
          <div class="rating-stars">${starsHtml}</div>
          <div class="rating-count">(${product.reviews})</div>
        </div>
        <div class="product-price">
          <span class="current-price">${formatNaira(product.price)}</span>
          ${
            product.originalPrice
              ? `<span class="original-price">${formatNaira(
                  product.originalPrice
                )}</span>`
              : ""
          }
        </div>
        <div class="product-actions">
          <button class="add-to-cart" data-id="${
            product.id
          }">Add to Cart</button>
          <button class="wishlist-btn"><i class="far fa-heart"></i></button>
        </div>
      </div>
    `;
    return productCard;
  }

  // Display filtered products
  function displayFilteredProducts(
    products,
    containerSelector = ".product-grid"
  ) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = "";

    if (products.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <p>No products found matching your criteria.</p>
          <button class="reset-search-button">Show All Products</button>
        </div>
      `;

      document
        .querySelector(".reset-search-button")
        ?.addEventListener("click", resetSearchAndFilters);
      return;
    }

    products.forEach((product) => {
      const productCard = createProductCard(product);
      container.appendChild(productCard);
    });

    initQuickView();
    initAddToCartButtons();
  }

  // Apply all active filters
  function applyAllFilters() {
    const searchTerm = searchInput.value.trim();
    const minPrice = priceMinInput.value.trim();
    const maxPrice = priceMaxInput.value.trim();

    let filteredProducts = getAllProducts();

    // Apply search filter
    filteredProducts = searchProducts(filteredProducts, searchTerm);

    // Apply price filter
    filteredProducts = filterProductsByPrice(
      filteredProducts,
      minPrice,
      maxPrice
    );

    // Display results
    displayFilteredProducts(filteredProducts);
  }

  // Reset all filters
  function resetSearchAndFilters() {
    searchInput.value = "";
    priceMinInput.value = "";
    priceMaxInput.value = "";

    if (productGrid && window.originalProductGridHTML) {
      productGrid.innerHTML = window.originalProductGridHTML;
      initQuickView();
      initAddToCartButtons();
    } else {
      displayFilteredProducts(getAllProducts());
    }
  }

  // Initialize event listeners for search and filter
  function initSearchAndFilter() {
    if (searchButton) {
      searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        applyAllFilters();
      });
    }

    if (searchInput) {
      searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          applyAllFilters();
        }
      });
    }

    if (applyFilterButton) {
      applyFilterButton.addEventListener("click", (e) => {
        e.preventDefault();
        applyAllFilters();
      });
    }

    if (resetFilterButton) {
      resetFilterButton.addEventListener("click", (e) => {
        e.preventDefault();
        resetSearchAndFilters();
      });
    }
  }

  // Initialize add to cart buttons for dynamically loaded products
  function initAddToCartButtons() {
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.dataset.id;
        const product = getAllProducts().find((p) => p.id == productId);
        if (product) {
          addToCart(product);
        }
      });
    });
  }

  // Cart Functionality
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    if (document.querySelector(".cart-modal.active")) {
      renderCartModal();
    }
  }

  function updateCartCount() {
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
      cartCount.textContent = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    }
  }

  function showFlashMessage(message) {
    const flashMessage = document.querySelector(".flash-message");
    if (flashMessage) {
      flashMessage.textContent = message;
      flashMessage.classList.add("active");
      setTimeout(() => flashMessage.classList.remove("active"), 2000);
    }
  }

  function addToCart(product, quantity = 1) {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    saveCart();
    showFlashMessage("Added to Cart");
  }

  function renderCartModal() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotalPrice = document.querySelector(".cart-total-price");
    if (!cartItemsContainer || !cartTotalPrice) return;

    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotalPrice.textContent = "₦0.00";
      return;
    }

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
        <div class="cart-item-info">
          <h4>${item.title}</h4>
          <p>${item.vendor}</p>
          <p>${formatNaira(item.price)}</p>
        </div>
        <div class="cart-item-actions">
          <div class="quantity-selector">
            <button class="quantity-minus">-</button>
            <input type="number" value="${item.quantity}" min="1">
            <button class="quantity-plus">+</button>
          </div>
          <button class="remove-item" data-id="${
            item.id
          }"><i class="fas fa-trash"></i></button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    cartTotalPrice.textContent = formatNaira(total);
  }

  // Cart Event Listeners
  const cartBtn = document.querySelector(".cart-btn");
  const cartModal = document.querySelector(".cart-modal");
  const closeCartModalBtn = document.querySelector(".close-cart-modal");
  const clearCartBtn = document.querySelector(".clear-cart");
  const checkoutBtn = document.querySelector(".checkout");
  const cartModalOverlay = document.querySelector(".cart-modal .modal-overlay");

  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      cartModal.classList.add("active");
      document.body.style.overflow = "hidden";
      renderCartModal();
    });
  }

  if (closeCartModalBtn) {
    closeCartModalBtn.addEventListener("click", () => {
      cartModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (cartModalOverlay) {
    cartModalOverlay.addEventListener("click", () => {
      cartModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      cart = [];
      saveCart();
    });
  }

  // Checkout Functionality
  const checkoutModal = document.querySelector(".checkout-modal");
  const closeCheckoutModalBtn = document.querySelector(".close-checkout-modal");
  const checkoutOverlay = document.querySelector(
    ".checkout-modal .modal-overlay"
  );
  const checkoutForms = document.querySelectorAll(".checkout-form");
  const checkoutSteps = document.querySelectorAll(".checkout-steps .step");
  const paymentMethods = document.querySelectorAll(".payment-method");
  const cardDetails = document.querySelector(".card-details");
  const btnNextList = document.querySelectorAll(".btn-next");
  const btnPrevList = document.querySelectorAll(".btn-prev");
  const btnComplete = document.querySelector(".btn-complete");
  const summaryItemsContainer = document.querySelectorAll(".summary-items");
  const subtotalElements = document.querySelectorAll(".subtotal");
  const totalElements = document.querySelectorAll(".total");
  const shippingDetailsContent = document.querySelector(".details-content");

  function openCheckoutModal() {
    if (cart.length === 0) {
      showFlashMessage("Your cart is empty. Add some items first!");
      return;
    }

    checkoutModal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Reset forms to first step
    checkoutForms.forEach((form) => form.classList.remove("active"));
    document.getElementById("shipping-form").classList.add("active");

    // Reset steps to first step
    checkoutSteps.forEach((step) => step.classList.remove("active"));
    checkoutSteps[0].classList.add("active");

    // Update order summary
    updateOrderSummary();
  }

  function closeCheckoutModal() {
    checkoutModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function updateOrderSummary() {
    let subtotal = 0;

    // Calculate subtotal in Naira
    cart.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    const shipping = 1500; // Fixed shipping cost in NGN
    const total = subtotal + shipping;

    // Update all summary items containers
    summaryItemsContainer.forEach((container) => {
      container.innerHTML = "";

      cart.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.className = "summary-item";
        itemElement.innerHTML = `
        <span class="item-name">${item.title}</span>
        <span class="item-quantity">x${item.quantity}</span>
        <span class="item-price">${formatNaira(
          item.price * item.quantity
        )}</span>
      `;
        container.appendChild(itemElement);
      });
    });

    // Update totals
    subtotalElements.forEach((el) => {
      el.textContent = formatNaira(subtotal);
    });

    totalElements.forEach((el) => {
      el.textContent = formatNaira(total);
    });

    // Generate order number
    const orderNumber = `PAPRT-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    document.querySelector(".order-number span").textContent = orderNumber;

    // Update shipping details preview
    updateShippingDetailsPreview();
  }

  function updateShippingDetailsPreview() {
    const form = document.getElementById("shipping-form");
    if (!form) return;

    const name = form.querySelector("#full-name")?.value || "Not provided";
    const email = form.querySelector("#email")?.value || "Not provided";
    const phone = form.querySelector("#phone")?.value || "Not provided";
    const address = form.querySelector("#address")?.value || "Not provided";
    const city = form.querySelector("#city")?.value || "Not provided";
    const state = form.querySelector("#state")?.value || "Not provided";

    shippingDetailsContent.innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>City:</strong> ${city}</p>
    <p><strong>State:</strong> ${state}</p>
  `;
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", openCheckoutModal);
  }

  if (closeCheckoutModalBtn) {
    closeCheckoutModalBtn.addEventListener("click", closeCheckoutModal);
  }

  if (checkoutOverlay) {
    checkoutOverlay.addEventListener("click", closeCheckoutModal);
  }

  // Payment method selection
  paymentMethods.forEach((method) => {
    method.addEventListener("click", function () {
      paymentMethods.forEach((m) => m.classList.remove("active"));
      this.classList.add("active");

      const methodType = this.dataset.method;
      if (methodType === "card") {
        cardDetails.classList.add("active");
      } else {
        cardDetails.classList.remove("active");
      }
    });
  });

  // Next button functionality
  btnNextList.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const currentForm = this.closest(".shipping-form");
      const nextFormId = this.dataset.next;
      const nextForm = document.getElementById(nextFormId);

      if (!nextForm) return;

      // Validate current form before proceeding
      if (currentForm.id === "shipping-form") {
        let isValid = true;
        const requiredFields = currentForm.querySelectorAll("[required]");

        requiredFields.forEach((field) => {
          if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = "red";

            // Reset border color when user starts typing
            field.addEventListener("input", function () {
              this.style.borderColor = "#ddd";
            });
          }
        });

        if (!isValid) {
          showFlashMessage("Please fill in all required fields");
          return;
        }

        // Update shipping details preview for confirmation step
        updateShippingDetailsPreview();
      }

      // Update active step
      const currentStep = Array.from(checkoutSteps).find((step) =>
        step.classList.contains("active")
      );
      const nextStepIndex = parseInt(currentStep.dataset.step);

      currentStep.classList.remove("active");
      checkoutSteps[nextStepIndex].classList.add("active");

      // Switch forms
      currentForm.classList.remove("active");
      nextForm.classList.add("active");

      // Scroll to top of form
      nextForm.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Previous button functionality
  btnPrevList.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const currentForm = this.closest(".checkout-form");
      const prevFormId = this.dataset.prev;
      const prevForm = document.getElementById(prevFormId);

      if (!prevForm) return;

      // Update active step
      const currentStep = Array.from(checkoutSteps).find((step) =>
        step.classList.contains("active")
      );
      const prevStepIndex = parseInt(currentStep.dataset.step) - 2;

      currentStep.classList.remove("active");
      checkoutSteps[prevStepIndex].classList.add("active");

      // Switch forms
      currentForm.classList.remove("active");
      prevForm.classList.add("active");

      // Scroll to top of form
      prevForm.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Complete order button
  if (btnComplete) {
    btnComplete.addEventListener("click", function (e) {
      e.preventDefault();

      // Clear cart
      cart = [];
      saveCart();

      // Close modal after delay
      setTimeout(() => {
        closeCheckoutModal();
        showFlashMessage("Thank you for your order!");
      }, 1000);
    });
  }

  // Format credit card input
  const cardNumberInput = document.getElementById("card-number");
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", function () {
      this.value = this.value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
    });
  }

  // Format expiry date input
  const expiryDateInput = document.getElementById("expiry-date");
  if (expiryDateInput) {
    expiryDateInput.addEventListener("input", function () {
      this.value = this.value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1/$2");
    });
  }

  // Cart quantity and remove item handlers
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("quantity-minus")) {
      const input = e.target.nextElementSibling;
      const id = e.target.closest(".cart-item")?.querySelector(".remove-item")
        ?.dataset.id;
      if (input && id && input.value > 1) {
        const item = cart.find((item) => item.id == id);
        if (item) {
          item.quantity--;
          saveCart();
        }
      }
    } else if (e.target.classList.contains("quantity-plus")) {
      const input = e.target.previousElementSibling;
      const id = e.target.closest(".cart-item")?.querySelector(".remove-item")
        ?.dataset.id;
      if (input && id) {
        const item = cart.find((item) => item.id == id);
        if (item) {
          item.quantity++;
          saveCart();
        }
      }
    } else if (
      e.target.classList.contains("remove-item") ||
      e.target.closest(".remove-item")
    ) {
      const id =
        e.target.dataset.id || e.target.closest(".remove-item").dataset.id;
      cart = cart.filter((item) => item.id != id);
      saveCart();
    }
  });

  updateCartCount();

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.checked = true;
  }

  darkModeToggle.addEventListener("change", function () {
    body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", this.checked ? "enabled" : "disabled");
  });

  // Mobile Menu Functionality
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileMenuClose = document.querySelector(".mobile-menu-close");

  if (mobileMenuToggle && mobileMenu && mobileMenuOverlay && mobileMenuClose) {
    // Handle dropdowns
    const mobileDropdowns = mobileMenu.querySelectorAll(".dropdown");
    mobileDropdowns.forEach((dropdown) => {
      const link = dropdown.querySelector(".nav-link");
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const isActive = dropdown.classList.contains("active");
        mobileDropdowns.forEach((d) => d.classList.remove("active"));
        if (!isActive) dropdown.classList.add("active");
      });
    });

    // Toggle mobile menu
    mobileMenuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      mobileMenuOverlay.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close menu
    mobileMenuOverlay.addEventListener("click", closeMobileMenu);
    mobileMenuClose.addEventListener("click", closeMobileMenu);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
        closeMobileMenu();
      }
    });

    function closeMobileMenu() {
      mobileMenu.classList.remove("active");
      mobileMenuOverlay.classList.remove("active");
      mobileDropdowns.forEach((d) => d.classList.remove("active"));
      document.body.style.overflow = "";
    }
  }

  // Carousel Functionality
  const carousel = document.querySelector(".carousel");
  if (carousel) {
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".carousel-dots");
    let currentSlide = 0;
    let autoplayInterval;

    if (slides.length > 0) {
      slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
      });

      const dots = document.querySelectorAll(".dot");

      function goToSlide(slideIndex) {
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");

        currentSlide = (slideIndex + slides.length) % slides.length;

        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
        resetAutoplay();
      }

      function nextSlide() {
        goToSlide(currentSlide + 1);
      }

      function prevSlide() {
        goToSlide(currentSlide - 1);
      }

      function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
      }

      function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
      }

      startAutoplay();

      carousel.addEventListener("mouseenter", () => {
        clearInterval(autoplayInterval);
      });

      carousel.addEventListener("mouseleave", startAutoplay);

      const nextBtn = document.querySelector(".next");
      const prevBtn = document.querySelector(".prev");

      if (nextBtn) nextBtn.addEventListener("click", nextSlide);
      if (prevBtn) prevBtn.addEventListener("click", prevSlide);

      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
      });
    }
  }

  // Product Cards
  const productGrid = document.querySelector(".product-grid");
  if (productGridElement) {
    const products = [
      {
        id: 1,
        title: "Handwoven Raffia Baskets",
        vendor: "CR Crafts",
        price: 7358,
        originalPrice: 9598,
        image: "img/made2.jpg",
        rating: 4.5,
        reviews: 24,
        badge: "Popular",
      },
      {
        id: 2,
        title: "Apple Complete",
        vendor: "Gigs & Gadgets",
        price: 2400000,
        originalPrice: 2900000,
        image: "img/tgad4.jpg",
        rating: 4.5,
        reviews: 24,
        badge: "Bestseller",
      },
      {
        id: 3,
        title: "Traditional styled foodware",
        vendor: "Officepub Crafts",
        price: 32000,
        originalPrice: 35900,
        image: "img/pop3.jpg",
        rating: 4.5,
        reviews: 24,
        badge: "High Demand",
      },
      {
        id: 4,
        title: "Locally made kitchen tools",
        vendor: "CR Crafts",
        price: 73584,
        originalPrice: 95984,
        image: "img/tkitch3.jpg",
        rating: 4.5,
        reviews: 24,
        badge: "New Arrival",
      },
    ];

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      const fullStars = Math.floor(product.rating);
      const hasHalfStar = product.rating % 1 >= 0.5;
      let starsHtml = "";

      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          starsHtml += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
          starsHtml += '<i class="fas fa-star-half-alt"></i>';
        } else {
          starsHtml += '<i class="far fa-star"></i>';
        }
      }

      productCard.innerHTML = `
        ${
          product.badge
            ? `<span class="product-badge">${product.badge}</span>`
            : ""
        }
        <div class="product-image">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
          <button class="quick-view-btn" data-product-id="${product.id}">
            <i class="far fa-eye"></i> Quick View
          </button>
        </div>
        <div class="product-info">
          <div class="product-vendor">${product.vendor}</div>
          <h3 class="product-title">${product.title}</h3>
          <div class="rating">
            <div class="rating-stars">${starsHtml}</div>
            <div class="rating-count">(${product.reviews})</div>
          </div>
          <div class="product-price">
            <span class="current-price">${formatNaira(product.price)}</span>
            ${
              product.originalPrice
                ? `<span class="original-price">${formatNaira(
                    product.originalPrice
                  )}</span>`
                : ""
            }
          </div>
          <div class="product-actions">
            <button class="add-to-cart" data-id="${
              product.id
            }">Add to Cart</button>
            <button class="wishlist-btn"><i class="far fa-heart"></i></button>
          </div>
        </div>
      `;

      productGrid.appendChild(productCard);
    });

    document.addEventListener("click", function (e) {
      const addToCartBtn = e.target.closest(".add-to-cart");
      if (addToCartBtn) {
        const productId = addToCartBtn.dataset.id;
        let product = products.find((p) => p.id == productId);
        if (!product) {
          for (const category in productCategories) {
            product = productCategories[category].find(
              (p) => p.id == productId
            );
            if (product) break;
          }
        }
        if (product) {
          addToCart(product);
        }
      }
    });
  }

  // Error handling for Font Awesome
  if (typeof FontAwesome === "undefined") {
    console.warn("Font Awesome not loaded - loading from CDN");
    const faScript = document.createElement("script");
    faScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js";
    document.head.appendChild(faScript);
  }

  // Quick View Functionality
  const quickViewModal = document.querySelector(".quick-view-modal");
  const modalOverlay = document.querySelector(".modal-overlay");
  const closeModalBtn = document.querySelector(".close-modal");

  const detailedProducts = {
    1: {
      title: "Handwoven Raffia Bag",
      vendor: "CR Crafts",
      price: 73584,
      image: "img/made2.jpg",
      originalPrice: 95984,
      description:
        "Beautifully handcrafted raffia bag made by local artisans in Cross River.",
      images: [
        "img/made2.jpg",
        "img/products/bag-2.jpg",
        "img/products/bag-3.jpg",
      ],
      rating: 4.5,
      reviews: 24,
    },
    2: {
      title: "Handwoven Raffia Bag",
      vendor: "CR Crafts",
      price: 73584,
      Image: "img/made2.jpg",
      originalPrice: 95984,
      description:
        "Beautifully handcrafted raffia bag made by local artisans in Cross River.",
      images: [
        "img/tgad4.jpg",
        "img/products/bag-2.jpg",
        "img/products/bag-3.jpg",
      ],
      rating: 4.5,
      reviews: 24,
    },
    3: {
      title: "Handwoven Raffia Bag",
      vendor: "CR Crafts",
      price: 73584,
      Image: "img/made2.jpg",
      originalPrice: 95984,
      description:
        "Beautifully handcrafted raffia bag made by local artisans in Cross River.",
      images: [
        "img/pop3.jpg",
        "img/products/bag-2.jpg",
        "img/products/bag-3.jpg",
      ],
      rating: 4.5,
      reviews: 24,
    },
    4: {
      title: "Handwoven Raffia Bag",
      vendor: "CR Crafts",
      price: 73584,
      Image: "img/tkitch3.jpg",
      originalPrice: 95984,
      description:
        "Beautifully handcrafted raffia bag made by local artisans in Cross River.",
      images: [
        "img/tkitch3.jpg",
        "img/products/bag-2.jpg",
        "img/products/bag-3.jpg",
      ],
      rating: 4.5,
      reviews: 24,
    },
  };

  document.addEventListener("click", function (e) {
    if (e.target.closest(".quick-view-btn")) {
      const productId = e.target.closest(".quick-view-btn").dataset.productId;
      openQuickViewModal(productId);
    }
  });

  document.addEventListener("click", function (e) {
    if (e.target.closest(".close-modal")) {
      closeQuickViewModal();
    }
  });
  modalOverlay.addEventListener("click", closeQuickViewModal);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && quickViewModal.classList.contains("active")) {
      closeQuickViewModal();
    }
  });

  function openQuickViewModal(productId) {
    let product = detailedProducts[productId];
    if (!product) {
      for (const category in productCategories) {
        product = productCategories[category].find((p) => p.id == productId);
        if (product) {
          product.description =
            product.description || "No description available.";
          product.images = product.images || [product.image];
          break;
        }
      }
    }
    if (!product) return;

    document.querySelector(".modal-product-info .product-title").textContent =
      product.title;
    document.querySelector(".modal-product-info .vendor").textContent =
      product.vendor;
    document.querySelector(".modal-product-info .current-price").textContent =
      formatNaira(product.price);

    if (product.originalPrice) {
      document.querySelector(
        ".modal-product-info .original-price"
      ).textContent = formatNaira(product.originalPrice);
      document.querySelector(
        ".modal-product-info .original-price"
      ).style.display = "inline";
    } else {
      document.querySelector(
        ".modal-product-info .original-price"
      ).style.display = "none";
    }

    document.querySelector(
      ".modal-product-info .product-description p"
    ).textContent = product.description;

    const ratingStars = document.querySelector(
      ".modal-product-info .rating-stars"
    );
    ratingStars.innerHTML = "";

    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        ratingStars.innerHTML += '<i class="fas fa-star"></i>';
      } else if (i === fullStars && hasHalfStar) {
        ratingStars.innerHTML += '<i class="fas fa-star-half-alt"></i>';
      } else {
        ratingStars.innerHTML += '<i class="far fa-star"></i>';
      }
    }

    document.querySelector(
      ".modal-product-info .review-count"
    ).textContent = `(${product.reviews})`;

    const mainImage = document.querySelector(".main-image img");
    const thumbnailContainer = document.querySelector(".thumbnail-container");

    mainImage.src = product.images[0];
    mainImage.alt = product.title;

    thumbnailContainer.innerHTML = "";

    product.images.forEach((img, index) => {
      const thumbnail = document.createElement("div");
      thumbnail.className = `thumbnail ${index === 0 ? "active" : ""}`;
      thumbnail.innerHTML = `<img src="${img}" alt="${
        product.title
      } Thumbnail ${index + 1}">`;
      thumbnail.addEventListener("click", () => {
        mainImage.src = img;
        document
          .querySelectorAll(".thumbnail")
          .forEach((t) => t.classList.remove("active"));
        thumbnail.classList.add("active");
      });
      thumbnailContainer.appendChild(thumbnail);
    });

    quickViewModal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Add to Cart from Quick View
    const quickViewAddToCart = quickViewModal.querySelector(".add-to-cart");
    quickViewAddToCart.dataset.id = product.id;
  }

  function closeQuickViewModal() {
    quickViewModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Quantity selector functionality
  document.addEventListener("click", function (e) {
    const quantityInput = e.target
      .closest(".quantity-selector")
      ?.querySelector("input");
    if (!quantityInput) return;

    if (e.target.classList.contains("quantity-minus")) {
      if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
      }
    } else if (e.target.classList.contains("quantity-plus")) {
      quantityInput.value = parseInt(quantityInput.value) + 1;
    }

    // Handle Add to Cart from Quick View
    if (
      e.target.classList.contains("add-to-cart") &&
      e.target.closest(".quick-view-modal")
    ) {
      const productId = e.target.dataset.id;
      let product = detailedProducts[productId];
      if (!product) {
        for (const category in productCategories) {
          product = productCategories[category].find((p) => p.id == productId);
          if (product) break;
        }
      }
      if (product) {
        const quantity = parseInt(
          quickViewModal.querySelector(".quantity-selector input").value
        );
        addToCart(product, quantity);
      }
    }
  });

  // Product data for each category (all prices in Naira)
  const productCategories = {
    trending: [
      {
        id: 101,
        title: "Wireless Earbuds",
        vendor: "TechGadgets",
        price: 95984,
        originalPrice: 127984,
        image: "img/nb2.jpg",
        rating: 4.7,
        reviews: 128,
        badge: "Popular",
      },
      {
        id: 102,
        title: "Stanly Cup",
        vendor: "Vicki Home Essentials",
        price: 95984,
        originalPrice: 127984,
        image: "img/stanley.jpg",
        rating: 4.7,
        reviews: 128,
        badge: "Popular",
      },
      {
        id: 103,
        title: "7000 puffs vape",
        vendor: "Unyime",
        price: 95984,
        originalPrice: 127984,
        image: "img/vape.png",
        rating: 4.7,
        reviews: 128,
        badge: "Popular",
      },
      {
        id: 104,
        title: "Nike Kyrie 4",
        vendor: "Appiah Apparel",
        price: 95984,
        originalPrice: 127984,
        image: "img/nike.jpg",
        rating: 4.7,
        reviews: 128,
        badge: "Popular",
      },
      {
        id: 105,
        title: "Two Piece Ankara Summer",
        vendor: "Oby's Couture",
        price: 95984,
        originalPrice: 127984,
        image: "img/oby.jpg",
        rating: 4.7,
        reviews: 128,
        badge: "Popular",
      },
      {
        id: 106,
        title: "2021 Apple Macbook Pro",
        vendor: "TechGadgets",
        price: 95984,
        originalPrice: 127984,
        image: "img/eleco.jpg",
        rating: 4.7,
        reviews: 128,
        badge: "Popular",
      },
    ],
    local: [
      {
        id: 201,
        title: "Beaded String Crafts",
        vendor: "CR Artisans",
        price: 55984, // 34.99 * 1600
        originalPrice: 68784, // 42.99 * 1600
        image: "img/made1.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
      },
      {
        id: 202,
        title: "Handmade Storage Baskets",
        vendor: "CR Artisans",
        price: 55984,
        originalPrice: 68784,
        image: "img/made2.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
      },
      {
        id: 203,
        title: "Handcarved Wooden Bowl",
        vendor: "CR Artisans",
        price: 55984,
        originalPrice: 68784,
        image: "img/made3.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
      },
      {
        id: 204,
        title: "Handcrafted Tapistry",
        vendor: "CR Artisans",
        price: 55984,
        originalPrice: 68784,
        image: "img/made4.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
      },
      {
        id: 205,
        title: "Handmade Shopping Basket",
        vendor: "CR Artisans",
        price: 55984,
        originalPrice: 68784,
        image: "img/made5.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
      },
      {
        id: 206,
        title: "Handcarved Wooden Kitchen Set",
        vendor: "CR Artisans",
        price: 55984,
        originalPrice: 68784,
        image: "img/made6.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
      },
    ],
    deals: [
      {
        id: 301,
        title: "Smart Headphones",
        vendor: "TechDeals",
        price: 143984, // 89.99 * 1600
        originalPrice: 207984, // 129.99 * 1600
        image: "img/tgad.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
      },
      {
        id: 302,
        title: "9th Gen Laptop PC",
        vendor: "TechDeals",
        price: 143984,
        originalPrice: 207984,
        image: "img/tgad2.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
      },
      {
        id: 303,
        title: "Home Music Carryons",
        vendor: "TechDeals",
        price: 143984,
        originalPrice: 207984,
        image: "img/tgad3.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
      },
      {
        id: 304,
        title: "Apple Gadget Set",
        vendor: "TechDeals",
        price: 143984,
        originalPrice: 207984,
        image: "img/tgad4.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
      },
      {
        id: 305,
        title: "Pink Apple Set For Him",
        vendor: "TechDeals",
        price: 143984,
        originalPrice: 207984,
        image: "img/tgad5.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
      },
      {
        id: 306,
        title: "Smart Watch",
        vendor: "TechDeals",
        price: 143984,
        originalPrice: 207984,
        image: "img/tgad6.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
      },
    ],
    male: [
      {
        id: 401,
        title: "Men's Ankara Shirt",
        vendor: "CR Fashion",
        price: 63984, // 39.99 * 1600
        originalPrice: 79984, // 49.99 * 1600
        image: "img/male.jpg",
        rating: 4.6,
        reviews: 89,
        badge: "New",
      },
      {
        id: 402,
        title: "Leather Loafers",
        vendor: "StyleHub",
        price: 111984, // 69.99 * 1600
        originalPrice: 143984, // 89.99 * 1600
        image: "img/male1.png",
        rating: 4.8,
        reviews: 102,
        badge: "Popular",
      },
      {
        id: 403,
        title: "Men's Blazer",
        vendor: "CR Fashion",
        price: 159984, // 99.99 * 1600
        originalPrice: 207984, // 129.99 * 1600
        image: "img/male2.jpg",
        rating: 4.7,
        reviews: 67,
        badge: "Trending",
      },
      {
        id: 404,
        title: "Casual Jeans",
        vendor: "StyleHub",
        price: 79984, // 49.99 * 1600
        originalPrice: 95984, // 59.99 * 1600
        image: "img/male3.jpg",
        rating: 4.5,
        reviews: 134,
        badge: "Bestseller",
      },
      {
        id: 405,
        title: "Graphic Tee",
        vendor: "CR Fashion",
        price: 47984, // 29.99 * 1600
        originalPrice: 63984, // 39.99 * 1600
        image: "img/male4.jpg",
        rating: 4.4,
        reviews: 98,
        badge: "Sale",
      },
      {
        id: 406,
        title: "Men's Watch",
        vendor: "StyleHub",
        price: 127984, // 79.99 * 1600
        originalPrice: 159984, // 99.99 * 1600
        image: "img/male5.jpg",
        rating: 4.9,
        reviews: 76,
        badge: "Luxury",
      },
    ],
    female: [
      {
        id: 501,
        title: "Ankara Dress",
        vendor: "CR Couture",
        price: 95984, // 59.99 * 1600
        originalPrice: 127984, // 79.99 * 1600
        image: "img/female.jpg",
        rating: 4.8,
        reviews: 112,
        badge: "New",
      },
      {
        id: 502,
        title: "High Heels",
        vendor: "Elegance",
        price: 143984, // 89.99 * 1600
        originalPrice: 175984, // 109.99 * 1600
        image: "img/female1.jpg",
        rating: 4.7,
        reviews: 95,
        badge: "Popular",
      },
      {
        id: 503,
        title: "Handbag",
        vendor: "CR Couture",
        price: 79984, // 49.99 * 1600
        originalPrice: 111984, // 69.99 * 1600
        image: "img/female2.jpg",
        rating: 4.6,
        reviews: 88,
        badge: "Trending",
      },
      {
        id: 504,
        title: "Maxi Skirt",
        vendor: "Elegance",
        price: 63984, // 39.99 * 1600
        originalPrice: 79984, // 49.99 * 1600
        image: "img/female3.jpg",
        rating: 4.5,
        reviews: 123,
        badge: "Bestseller",
      },
      {
        id: 505,
        title: "Blouse",
        vendor: "CR Couture",
        price: 47984, // 29.99 * 1600
        originalPrice: 63984, // 39.99 * 1600
        image: "img/female4.jpg",
        rating: 4.4,
        reviews: 107,
        badge: "Sale",
      },
      {
        id: 506,
        title: "Necklace Set",
        vendor: "Elegance",
        price: 111984, // 69.99 * 1600
        originalPrice: 143984, // 89.99 * 1600
        image: "img/female5.jpg",
        rating: 4.9,
        reviews: 65,
        badge: "Luxury",
      },
    ],
    unisex: [
      {
        id: 601,
        title: "Unisex Hoodie",
        vendor: "CR Trends",
        price: 79984, // 49.99 * 1600
        originalPrice: 95984, // 59.99 * 1600
        image: "img/uni.jpg",
        rating: 4.7,
        reviews: 145,
        badge: "New",
      },
      {
        id: 602,
        title: "Sneakers",
        vendor: "StyleZone",
        price: 127984, // 79.99 * 1600
        originalPrice: 159984, // 99.99 * 1600
        image: "img/uni1.jpg",
        rating: 4.8,
        reviews: 132,
        badge: "Popular",
      },
      {
        id: 603,
        title: "Backpack",
        vendor: "CR Trends",
        price: 63984, // 39.99 * 1600
        originalPrice: 79984, // 49.99 * 1600
        image: "img/uni2.jpg",
        rating: 4.6,
        reviews: 99,
        badge: "Trending",
      },
      {
        id: 604,
        title: "Cap",
        vendor: "StyleZone",
        price: 31984, // 19.99 * 1600
        originalPrice: 47984, // 29.99 * 1600
        image: "img/uni3.jpg",
        rating: 4.5,
        reviews: 156,
        badge: "Bestseller",
      },
      {
        id: 605,
        title: "Sunglasses",
        vendor: "CR Trends",
        price: 47984, // 29.99 * 1600
        originalPrice: 63984, // 39.99 * 1600
        image: "img/uni4.jpg",
        rating: 4.4,
        reviews: 111,
        badge: "Sale",
      },
      {
        id: 606,
        title: "Wristband",
        vendor: "StyleZone",
        price: 23984, // 14.99 * 1600
        originalPrice: 31984, // 19.99 * 1600
        image: "img/uni5.jpg",
        rating: 4.3,
        reviews: 87,
        badge: "Casual",
      },
    ],
    general: [
      {
        id: 701,
        title: "Smart TV",
        vendor: "TechZone",
        price: 639984, // 399.99 * 1600
        originalPrice: 799984, // 499.99 * 1600
        image: "img/gen.jpg",
        rating: 4.8,
        reviews: 189,
        badge: "New",
      },
      {
        id: 702,
        title: "Laptop",
        vendor: "GadgetsPro",
        price: 1279984, // 799.99 * 1600
        originalPrice: 1599984, // 999.99 * 1600
        image: "img/gen1.jpg",
        rating: 4.7,
        reviews: 165,
        badge: "Popular",
      },
      {
        id: 703,
        title: "Home Theater",
        vendor: "TechZone",
        price: 479984, // 299.99 * 1600
        originalPrice: 639984, // 399.99 * 1600
        image: "img/gen2.jpg",
        rating: 4.6,
        reviews: 134,
        badge: "Trending",
      },
      {
        id: 704,
        title: "Desktop PC",
        vendor: "GadgetsPro",
        price: 959984, // 599.99 * 1600
        originalPrice: 1279984, // 799.99 * 1600
        image: "img/gen3.jpg",
        rating: 4.5,
        reviews: 122,
        badge: "Bestseller",
      },
      {
        id: 705,
        title: "Gaming Console",
        vendor: "TechZone",
        price: 639984, // 399.99 * 1600
        originalPrice: 799984, // 499.99 * 1600
        image: "img/gen4.jpg",
        rating: 4.9,
        reviews: 198,
        badge: "Hot",
      },
      {
        id: 706,
        title: "Projector",
        vendor: "GadgetsPro",
        price: 399984, // 249.99 * 1600
        originalPrice: 559984, // 349.99 * 1600
        image: "img/gen5.jpg",
        rating: 4.4,
        reviews: 109,
        badge: "Sale",
      },
    ],
    phones: [
      {
        id: 801,
        title: "Smartphone Pro",
        vendor: "TechTrend",
        price: 1119984, // 699.99 * 1600
        originalPrice: 1439984, // 899.99 * 1600
        image: "img/phone5.jpg",
        rating: 4.8,
        reviews: 234,
        badge: "New",
      },
      {
        id: 802,
        title: "Budget Phone",
        vendor: "GadgetWorld",
        price: 319984, // 199.99 * 1600
        originalPrice: 399984, // 249.99 * 1600
        image: "img/phone.jpg",
        rating: 4.6,
        reviews: 178,
        badge: "Popular",
      },
      {
        id: 803,
        title: "Flagship Phone",
        vendor: "TechTrend",
        price: 1599984, // 999.99 * 1600
        originalPrice: 1919984, // 1199.99 * 1600
        image: "img/phone1.jpg",
        rating: 4.9,
        reviews: 256,
        badge: "Trending",
      },
      {
        id: 804,
        title: "Midrange Phone",
        vendor: "GadgetWorld",
        price: 639984, // 399.99 * 1600
        originalPrice: 799984, // 499.99 * 1600
        image: "img/phone2.jpg",
        rating: 4.7,
        reviews: 199,
        badge: "Bestseller",
      },
      {
        id: 805,
        title: "Foldable Phone",
        vendor: "TechTrend",
        price: 2079984, // 1299.99 * 1600
        originalPrice: 2399984, // 1499.99 * 1600
        image: "img/phone3.jpg",
        rating: 4.8,
        reviews: 167,
        badge: "Luxury",
      },
      {
        id: 806,
        title: "Rugged Phone",
        vendor: "GadgetWorld",
        price: 479984, // 299.99 * 1600
        originalPrice: 639984, // 399.99 * 1600
        image: "img/phone4.jpg",
        rating: 4.5,
        reviews: 145,
        badge: "Durable",
      },
    ],
    accessories: [
      {
        id: 901,
        title: "Wireless Charger",
        vendor: "TechBits",
        price: 47984, // 29.99 * 1600
        originalPrice: 63984, // 39.99 * 1600
        image: "img/acc.jpg",
        rating: 4.7,
        reviews: 156,
        badge: "New",
      },
      {
        id: 902,
        title: "Bluetooth Earbuds",
        vendor: "GadgetGear",
        price: 79984, // 49.99 * 1600
        originalPrice: 111984, // 69.99 * 1600
        image: "img/acc1.jpg",
        rating: 4.8,
        reviews: 189,
        badge: "Popular",
      },
      {
        id: 903,
        title: "Phone Case",
        vendor: "TechBits",
        price: 31984, // 19.99 * 1600
        originalPrice: 47984, // 29.99 * 1600
        image: "img/acc2.jpg",
        rating: 4.6,
        reviews: 134,
        badge: "Trending",
      },
      {
        id: 904,
        title: "Screen Protector",
        vendor: "GadgetGear",
        price: 23984, // 14.99 * 1600
        originalPrice: 31984, // 19.99 * 1600
        image: "img/acc3.jpg",
        rating: 4.5,
        reviews: 167,
        badge: "Bestseller",
      },
      {
        id: 905,
        title: "Smartwatch Band",
        vendor: "TechBits",
        price: 39984, // 24.99 * 1600
        originalPrice: 55984, // 34.99 * 1600
        image: "img/acc4.jpg",
        rating: 4.4,
        reviews: 123,
        badge: "Sale",
      },
      {
        id: 906,
        title: "USB-C Cable",
        vendor: "GadgetGear",
        price: 15984,
        originalPrice: 23984,
        image: "img/acc5.jpg",
        rating: 4.3,
        reviews: 198,
        badge: "Essential",
      },
    ],
    smartphonesapple: [
      {
        id: 711,
        title: "Iphone 16 128GB",
        vendor: "Gigs & Gadgets",
        price: 2100000,
        originalPrice: 2300000,
        image: "img/phones/a1.jpg",
        rating: 4.7,
        reviews: 156,
        badge: "New",
      },
      {
        id: 299,
        title: "Iphone 13 pro 64GB",
        vendor: "GadgetGear",
        description: "64GB UK used 13 pro",
        price: 699845,
        originalPrice: 724000,
        image: "img/phones/a2.jpg",
        rating: 4.8,
        reviews: 189,
        badge: "Popular",
      },
      {
        id: 399,
        title: "IPhone 13 promax 256GB",
        vendor: "TechBits",
        price: 752000,
        originalPrice: 774000,
        description: "256GB UK used 13 promax",
        image: "img/phones/a3.jpg",
        rating: 4.6,
        reviews: 134,
        badge: "Trending",
      },
      {
        id: 499,
        title: "Iphone 8Plus 128GB",
        vendor: "GadgetGear",
        price: 289845,
        originalPrice: 319845,
        description: "128GB UK used Iphone 8plus",
        image: "img/phones/a4.jpg",
        rating: 4.5,
        reviews: 167,
        badge: "Bestseller",
      },
      {
        id: 599,
        title: "Iphone 12",
        vendor: "TechBits",
        price: 69984,
        originalPrice: 559845,
        image: "img/phones/a5.jpg",
        rating: 4.4,
        reviews: 123,
        badge: "Sale",
      },
      {
        id: 699,
        title: "Phone 11 64GB",
        vendor: "GadgetGear",
        price: 355984,
        originalPrice: 323984,
        image: "img/phones/a6.jpg",
        rating: 4.3,
        reviews: 198,
        badge: "Essential",
      },
      {
        id: 599,
        title: "Iphone 14 promax 512GB",
        vendor: "Gigs & Gadgets",
        price: 1199845,
        originalPrice: 9255984,
        image: "img/phones/a7.jpg",
        rating: 4.4,
        reviews: 123,
        badge: "Sale",
      },
      {
        id: 699,
        title: "Iphone 13 promax 512GB",
        vendor: "GadgetGear",
        price: 765984,
        originalPrice: 6923984,
        image: "img/phones/a8.jpg",
        rating: 4.3,
        reviews: 198,
        badge: "Essential",
      },
    ],
  };
  // ==================== CATEGORY PAGE DISPLAY ====================
  function displayCategoryProducts(categoryId) {
    const categoryContainer = document.querySelector(`.category-${categoryId}`);
    if (!categoryContainer) return;

    const products = productCategories[categoryId] || [];
    displayFilteredProducts(products, `.category-${categoryId}`);
  }

  // ==================== INITIALIZE CATEGORY PAGES ====================
  function initCategoryPages() {
    // Check if we're on a category page
    const categoryPage = document.querySelector("[data-category-page]");
    if (!categoryPage) return;

    const categoryId = categoryPage.dataset.categoryPage;
    if (productCategories[categoryId]) {
      displayCategoryProducts(categoryId);
    }
  }

  // Initialize all carousels
  initCategoryPages();
  const carouselIntervals = new Map();

  function initTabCarousels(sectionSelector) {
    const section = document.querySelector(sectionSelector);
    if (!section) return;

    const tabBtns = section.querySelectorAll(".tab-btn");
    const tabContents = section.querySelectorAll(".tab-content");

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        carouselIntervals.forEach((interval) => clearInterval(interval));
        carouselIntervals.clear();

        tabBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const tabId = this.dataset.tab;
        tabContents.forEach((content) => {
          content.classList.remove("active");
          if (content.id === tabId) {
            content.classList.add("active");
            initCarousel(content);
          }
        });

        renderProducts(tabId, sectionSelector);
      });
    });

    const firstTab = section.querySelector(".tab-content.active");
    if (firstTab) {
      renderProducts(firstTab.id, sectionSelector);
      initCarousel(firstTab);
    }
  }

  function initCarousel(tabContent) {
    const carousel = tabContent.querySelector(".products-carousel");
    if (!carousel) return;

    if (carouselIntervals.has(carousel)) {
      clearInterval(carouselIntervals.get(carousel));
    }

    // Clone items for seamless looping
    const items = carousel.querySelectorAll(".product-card");
    if (items.length > 0) {
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
      });
    }

    const prevBtn = tabContent.querySelector(".carousel-prev");
    const nextBtn = tabContent.querySelector(".carousel-next");

    const getScrollAmount = () => {
      const card = carousel.querySelector(".product-card");
      return card ? card.offsetWidth + 20 : 300;
    };

    const scrollPrev = () => {
      carousel.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    };

    const scrollNext = () => {
      carousel.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
      setTimeout(() => {
        if (
          carousel.scrollLeft + carousel.clientWidth >=
          carousel.scrollWidth - 10
        ) {
          carousel.scrollTo({ left: 0, behavior: "instant" });
        }
      }, 500);
    };

    const updateButtons = () => {
      if (!prevBtn || !nextBtn) return;
      prevBtn.disabled = carousel.scrollLeft <= 10;
      nextBtn.disabled = false;
    };

    prevBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      pauseCarousel();
      scrollPrev();
      resetCarousel();
    });

    nextBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      pauseCarousel();
      scrollNext();
      resetCarousel();
    });

    carousel.addEventListener("scroll", updateButtons);
    updateButtons();

    const startCarousel = () => {
      if (carouselIntervals.has(carousel)) return;

      const interval = setInterval(() => {
        scrollNext();
      }, 3000);

      carouselIntervals.set(carousel, interval);
    };

    const pauseCarousel = () => {
      if (carouselIntervals.has(carousel)) {
        clearInterval(carouselIntervals.get(carousel));
        carouselIntervals.delete(carousel);
      }
    };

    const resetCarousel = () => {
      pauseCarousel();
      startCarousel();
    };

    carousel.addEventListener("mouseenter", pauseCarousel);
    carousel.addEventListener("mouseleave", startCarousel);
    carousel.addEventListener("touchstart", pauseCarousel);
    carousel.addEventListener("touchend", startCarousel);

    startCarousel();
  }

  function renderProducts(category, sectionSelector) {
    const products = productCategories[category];
    const carousel = document.querySelector(
      `${sectionSelector} #${category} .products-carousel`
    );

    if (!products || !carousel) return;

    carousel.innerHTML = "";

    products.forEach((product) => {
      const fullStars = Math.floor(product.rating);
      const hasHalfStar = product.rating % 1 >= 0.5;
      let starsHtml = "";

      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          starsHtml += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
          starsHtml += '<i class="fas fa-star-half-alt"></i>';
        } else {
          starsHtml += '<i class="far fa-star"></i>';
        }
      }

      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        ${
          product.badge
            ? `<span class="product-badge">${product.badge}</span>`
            : ""
        }
        <div class="product-image">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
          <button class="quick-view-btn" data-product-id="${product.id}">
            <i class="far fa-eye"></i> Quick View
          </button>
        </div>
        <div class="product-info">
          <div class="product-vendor">${product.vendor}</div>
          <h3 class="product-title">${product.title}</h3>
          <div class="rating">
            <div class="rating-stars">${starsHtml}</div>
            <div class="rating-count">(${product.reviews})</div>
          </div>
          <div class="product-price">
            <span class="current-price">${formatNaira(product.price)}</span>
            ${
              product.originalPrice
                ? `<span class="original-price">${formatNaira(
                    product.originalPrice
                  )}</span>`
                : ""
            }
          </div>
          <div class="product-actions">
            <button class="add-to-cart" data-id="${
              product.id
            }">Add to Cart</button>
            <button class="wishlist-btn"><i class="far fa-heart"></i></button>
          </div>
        </div>
      `;

      carousel.appendChild(productCard);
    });

    initQuickView();
  }

  function initQuickView() {
    document.querySelectorAll(".quick-view-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const productId = this.dataset.productId;
        openQuickViewModal(productId);
      });
    });
  }

  initSearchAndFilter();
  initAddToCartButtons();

  // Initialize all sections
  initTabCarousels(".featured-products");
  initTabCarousels(".fashion-products");
  initTabCarousels(".electronics-products");
});
