document.addEventListener("DOMContentLoaded", function () {
  console.log("Tinapa E-Commerce JS initialized");

  // Currency conversion function
  function convertToNGN(usdPrice) {
    const exchangeRate = 1600; // 1 USD = 1,600 NGN (adjust as needed)
    const ngnPrice = usdPrice * exchangeRate;
    if (ngnPrice >= 1000000) {
      // For millions, show whole numbers
      return `₦${Math.round(ngnPrice).toLocaleString("en-NG")}`;
    } else {
      // For smaller amounts, show two decimal places
      return `₦${ngnPrice.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
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
      cartTotalPrice.textContent = "₦0";
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
          <p>${convertToNGN(item.price)}</p>
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
    cartTotalPrice.textContent = convertToNGN(total);
  }

  // Cart Event Listeners
  const cartBtn = document.querySelector(".cart-btn");
  const cartModal = document.querySelector(".cart-modal");
  const closeCartModalBtn = document.querySelector(".close-cart-modal");
  const clearCartBtn = document.querySelector(".clear-cart");
  const checkoutBtn = document.querySelector(".checkout");
  const cartModalOverlay = document.querySelector(".cart-modal .modal-overlay");
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

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert("Proceed to checkout?");
      // Implement checkout logic here
    });
  }
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

  // Close checkout modal
  function closeCheckoutModal() {
    checkoutModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Update order summary with cart items
  function updateOrderSummary() {
    let subtotalUSD = 0;

    // Calculate subtotal in USD
    cart.forEach((item) => {
      subtotalUSD += item.price * item.quantity;
    });

    // Convert to NGN
    const exchangeRate = 1600;
    const subtotalNGN = subtotalUSD * exchangeRate;
    const shippingNGN = 1500; // Fixed shipping cost in NGN
    const totalNGN = subtotalNGN + shippingNGN;

    // Update all summary items containers
    summaryItemsContainer.forEach((container) => {
      container.innerHTML = "";

      cart.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.className = "summary-item";
        itemElement.innerHTML = `
        <span class="item-name">${item.title}</span>
        <span class="item-quantity">x${item.quantity}</span>
        <span class="item-price">${convertToNGN(
          item.price * item.quantity
        )}</span>
      `;
        container.appendChild(itemElement);
      });
    });

    // Update totals - now all in NGN
    subtotalElements.forEach((el) => {
      el.textContent = `₦${subtotalNGN.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    });

    totalElements.forEach((el) => {
      el.textContent = `₦${totalNGN.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    });

    // Generate order number
    const orderNumber = `PAPRT-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    document.querySelector(".order-number span").textContent = orderNumber;

    // Update shipping details preview
    updateShippingDetailsPreview();
  }

  // Update shipping details preview in confirmation step
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

  // Event listeners
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
  if (productGrid) {
    const products = [
      {
        id: 1,
        title: "Handwoven Raffia Baskets",
        vendor: "CR Crafts",
        price: 45.99,
        originalPrice: 59.99,
        image: "img/made2.jpg",
        rating: 4.5,
        reviews: 24,
        badge: "Popular",
      },
      {
        id: 2,
        title: "Apple Complete",
        vendor: "Gigs & Gadgets",
        price: 4.0,
        originalPrice: 59.99,
        image: "img/tgad4.jpg",
        rating: 4.5,
        reviews: 24,
        badge: "Bestseller",
      },
      {
        id: 3,
        title: "Traditional styled foodware",
        vendor: "Officepub Crafts",
        price: 45.99,
        originalPrice: 59.99,
        image: "img/pop3.jpg",
        rating: 4.5,
        reviews: 24,
        badge: "High Demand",
      },
      {
        id: 4,
        title: "Locally made kitchen tools",
        vendor: "CR Crafts",
        price: 45.99,
        originalPrice: 59.99,
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
            <span class="current-price">${convertToNGN(product.price)}</span>
            ${
              product.originalPrice
                ? `<span class="original-price">${convertToNGN(
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
      price: 45.99,
      image: "img/made2.jpg",
      originalPrice: 59.99,
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
      price: 45.99,
      Image: "img/made2.jpg",
      originalPrice: 59.99,
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
      price: 45.99,
      Image: "img/made2.jpg",
      originalPrice: 59.99,
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
      price: 45.99,
      Image: "img/tkitch3.jpg",
      originalPrice: 59.99,
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
      convertToNGN(product.price);

    if (product.originalPrice) {
      document.querySelector(
        ".modal-product-info .original-price"
      ).textContent = convertToNGN(product.originalPrice);
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

  // Product data for each category
  const productCategories = {
    trending: [
      {
        id: 101,
        title: "Wireless Earbuds",
        vendor: "TechGadgets",
        price: 59.99,
        originalPrice: 79.99,
        image: "img/nb2.jpg",
        rating: 4.7,
        reviews: 128,
        badge: "Popular",
      },
      {
        id: 102,
        title: "Stanly Cup",
        vendor: "Vicki Home Essentials",
        price: 59.99,
        originalPrice: 79.99,
        image: "img/stanley.jpg",
        rating: 4.7,
        reviews: 128,
        badge: "Popular",
      },
      {
        id: 103,
        title: "7000 puffs vape",
        vendor: "Unyime",
        price: 59.99,
        originalPrice: 79.99,
        image: "img/vape.png",
        rating: 4.7,
        reviews: 128,
        badge: "Popular",
      },
      {
        id: 104,
        title: "Nike Kyrie 4",
        vendor: "Appiah Apparel",
        price: 59.99,
        originalPrice: 79.99,
        image: "img/nike.jpg",
        rating: 4.7,
        reviews: 128,
        badge: "Popular",
      },
      {
        id: 105,
        title: "Two Piece Ankara Summer",
        vendor: "Oby's Couture",
        price: 59.99,
        originalPrice: 79.99,
        image: "img/oby.jpg",
        rating: 4.7,
        reviews: 128,
        badge: "Popular",
      },
      {
        id: 106,
        title: "2021 Apple Macbook Pro",
        vendor: "TechGadgets",
        price: 59.99,
        originalPrice: 79.99,
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
        price: 34.99,
        originalPrice: 42.99,
        image: "img/made1.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
      },
      {
        id: 202,
        title: "Handmade Storage Baskets",
        vendor: "CR Artisans",
        price: 34.99,
        originalPrice: 42.99,
        image: "img/made2.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
      },
      {
        id: 203,
        title: "Handcarved Wooden Bowl",
        vendor: "CR Artisans",
        price: 34.99,
        originalPrice: 42.99,
        image: "img/made3.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
      },
      {
        id: 204,
        title: "Handcrafted Tapistry",
        vendor: "CR Artisans",
        price: 34.99,
        originalPrice: 42.99,
        image: "img/made4.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
      },
      {
        id: 205,
        title: "Handmade Shopping Basket",
        vendor: "CR Artisans",
        price: 34.99,
        originalPrice: 42.99,
        image: "img/made5.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
      },
      {
        id: 206,
        title: "Handcarved Wooden Kitchen Set",
        vendor: "CR Artisans",
        price: 34.99,
        originalPrice: 42.99,
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
        price: 89.99,
        originalPrice: 129.99,
        image: "img/tgad.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
      },
      {
        id: 302,
        title: "9th Gen Laptop PC",
        vendor: "TechDeals",
        price: 89.99,
        originalPrice: 129.99,
        image: "img/tgad2.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
      },
      {
        id: 303,
        title: "Home Music Carryons",
        vendor: "TechDeals",
        price: 89.99,
        originalPrice: 129.99,
        image: "img/tgad3.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
      },
      {
        id: 304,
        title: "Apple Gadget Set",
        vendor: "TechDeals",
        price: 89.99,
        originalPrice: 129.99,
        image: "img/tgad4.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
      },
      {
        id: 305,
        title: "Pink Apple Set For Him",
        vendor: "TechDeals",
        price: 89.99,
        originalPrice: 129.99,
        image: "img/tgad5.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
      },
      {
        id: 306,
        title: "Smart Watch",
        vendor: "TechDeals",
        price: 89.99,
        originalPrice: 129.99,
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
        price: 39.99,
        originalPrice: 49.99,
        image: "img/male.jpg",
        rating: 4.6,
        reviews: 89,
        badge: "New",
      },
      {
        id: 402,
        title: "Leather Loafers",
        vendor: "StyleHub",
        price: 69.99,
        originalPrice: 89.99,
        image: "img/male1.png",
        rating: 4.8,
        reviews: 102,
        badge: "Popular",
      },
      {
        id: 403,
        title: "Men's Blazer",
        vendor: "CR Fashion",
        price: 99.99,
        originalPrice: 129.99,
        image: "img/male2.jpg",
        rating: 4.7,
        reviews: 67,
        badge: "Trending",
      },
      {
        id: 404,
        title: "Casual Jeans",
        vendor: "StyleHub",
        price: 49.99,
        originalPrice: 59.99,
        image: "img/male3.jpg",
        rating: 4.5,
        reviews: 134,
        badge: "Bestseller",
      },
      {
        id: 405,
        title: "Graphic Tee",
        vendor: "CR Fashion",
        price: 29.99,
        originalPrice: 39.99,
        image: "img/male4.jpg",
        rating: 4.4,
        reviews: 98,
        badge: "Sale",
      },
      {
        id: 406,
        title: "Men's Watch",
        vendor: "StyleHub",
        price: 79.99,
        originalPrice: 99.99,
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
        price: 59.99,
        originalPrice: 79.99,
        image: "img/female.jpg",
        rating: 4.8,
        reviews: 112,
        badge: "New",
      },
      {
        id: 502,
        title: "High Heels",
        vendor: "Elegance",
        price: 89.99,
        originalPrice: 109.99,
        image: "img/female1.jpg",
        rating: 4.7,
        reviews: 95,
        badge: "Popular",
      },
      {
        id: 503,
        title: "Handbag",
        vendor: "CR Couture",
        price: 49.99,
        originalPrice: 69.99,
        image: "img/female2.jpg",
        rating: 4.6,
        reviews: 88,
        badge: "Trending",
      },
      {
        id: 504,
        title: "Maxi Skirt",
        vendor: "Elegance",
        price: 39.99,
        originalPrice: 49.99,
        image: "img/female3.jpg",
        rating: 4.5,
        reviews: 123,
        badge: "Bestseller",
      },
      {
        id: 505,
        title: "Blouse",
        vendor: "CR Couture",
        price: 29.99,
        originalPrice: 39.99,
        image: "img/female4.jpg",
        rating: 4.4,
        reviews: 107,
        badge: "Sale",
      },
      {
        id: 506,
        title: "Necklace Set",
        vendor: "Elegance",
        price: 69.99,
        originalPrice: 89.99,
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
        price: 49.99,
        originalPrice: 59.99,
        image: "img/uni.jpg",
        rating: 4.7,
        reviews: 145,
        badge: "New",
      },
      {
        id: 602,
        title: "Sneakers",
        vendor: "StyleZone",
        price: 79.99,
        originalPrice: 99.99,
        image: "img/uni1.jpg",
        rating: 4.8,
        reviews: 132,
        badge: "Popular",
      },
      {
        id: 603,
        title: "Backpack",
        vendor: "CR Trends",
        price: 39.99,
        originalPrice: 49.99,
        image: "img/uni2.jpg",
        rating: 4.6,
        reviews: 99,
        badge: "Trending",
      },
      {
        id: 604,
        title: "Cap",
        vendor: "StyleZone",
        price: 19.99,
        originalPrice: 29.99,
        image: "img/uni3.jpg",
        rating: 4.5,
        reviews: 156,
        badge: "Bestseller",
      },
      {
        id: 605,
        title: "Sunglasses",
        vendor: "CR Trends",
        price: 29.99,
        originalPrice: 39.99,
        image: "img/uni4.jpg",
        rating: 4.4,
        reviews: 111,
        badge: "Sale",
      },
      {
        id: 606,
        title: "Wristband",
        vendor: "StyleZone",
        price: 14.99,
        originalPrice: 19.99,
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
        price: 399.99,
        originalPrice: 499.99,
        image: "img/gen.jpg",
        rating: 4.8,
        reviews: 189,
        badge: "New",
      },
      {
        id: 702,
        title: "Laptop",
        vendor: "GadgetsPro",
        price: 799.99,
        originalPrice: 999.99,
        image: "img/gen1.jpg",
        rating: 4.7,
        reviews: 165,
        badge: "Popular",
      },
      {
        id: 703,
        title: "Home Theater",
        vendor: "TechZone",
        price: 299.99,
        originalPrice: 399.99,
        image: "img/gen2.jpg",
        rating: 4.6,
        reviews: 134,
        badge: "Trending",
      },
      {
        id: 704,
        title: "Desktop PC",
        vendor: "GadgetsPro",
        price: 599.99,
        originalPrice: 799.99,
        image: "img/gen3.jpg",
        rating: 4.5,
        reviews: 122,
        badge: "Bestseller",
      },
      {
        id: 705,
        title: "Gaming Console",
        vendor: "TechZone",
        price: 399.99,
        originalPrice: 499.99,
        image: "img/gen4.jpg",
        rating: 4.9,
        reviews: 198,
        badge: "Hot",
      },
      {
        id: 706,
        title: "Projector",
        vendor: "GadgetsPro",
        price: 249.99,
        originalPrice: 349.99,
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
        price: 699.99,
        originalPrice: 899.99,
        image: "img/phone5.jpg",
        rating: 4.8,
        reviews: 234,
        badge: "New",
      },
      {
        id: 802,
        title: "Budget Phone",
        vendor: "GadgetWorld",
        price: 199.99,
        originalPrice: 249.99,
        image: "img/phone.jpg",
        rating: 4.6,
        reviews: 178,
        badge: "Popular",
      },
      {
        id: 803,
        title: "Flagship Phone",
        vendor: "TechTrend",
        price: 999.99,
        originalPrice: 1199.99,
        image: "img/phone1.jpg",
        rating: 4.9,
        reviews: 256,
        badge: "Trending",
      },
      {
        id: 804,
        title: "Midrange Phone",
        vendor: "GadgetWorld",
        price: 399.99,
        originalPrice: 499.99,
        image: "img/phone2.jpg",
        rating: 4.7,
        reviews: 199,
        badge: "Bestseller",
      },
      {
        id: 805,
        title: "Foldable Phone",
        vendor: "TechTrend",
        price: 1299.99,
        originalPrice: 1499.99,
        image: "img/phone3.jpg",
        rating: 4.8,
        reviews: 167,
        badge: "Luxury",
      },
      {
        id: 806,
        title: "Rugged Phone",
        vendor: "GadgetWorld",
        price: 299.99,
        originalPrice: 399.99,
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
        price: 29.99,
        originalPrice: 39.99,
        image: "img/acc.jpg",
        rating: 4.7,
        reviews: 156,
        badge: "New",
      },
      {
        id: 902,
        title: "Bluetooth Earbuds",
        vendor: "GadgetGear",
        price: 49.99,
        originalPrice: 69.99,
        image: "img/acc1.jpg",
        rating: 4.8,
        reviews: 189,
        badge: "Popular",
      },
      {
        id: 903,
        title: "Phone Case",
        vendor: "TechBits",
        price: 19.99,
        originalPrice: 29.99,
        image: "img/acc2.jpg",
        rating: 4.6,
        reviews: 134,
        badge: "Trending",
      },
      {
        id: 904,
        title: "Screen Protector",
        vendor: "GadgetGear",
        price: 14.99,
        originalPrice: 19.99,
        image: "img/acc3.jpg",
        rating: 4.5,
        reviews: 167,
        badge: "Bestseller",
      },
      {
        id: 905,
        title: "Smartwatch Band",
        vendor: "TechBits",
        price: 24.99,
        originalPrice: 34.99,
        image: "img/acc4.jpg",
        rating: 4.4,
        reviews: 123,
        badge: "Sale",
      },
      {
        id: 906,
        title: "USB-C Cable",
        vendor: "GadgetGear",
        price: 9.99,
        originalPrice: 14.99,
        image: "img/acc5.jpg",
        rating: 4.3,
        reviews: 198,
        badge: "Essential",
      },
    ],
  };

  // Initialize all carousels
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
            <span class="current-price">${convertToNGN(product.price)}</span>
            ${
              product.originalPrice
                ? `<span class="original-price">${convertToNGN(
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

  // Initialize all sections
  initTabCarousels(".featured-products");
  initTabCarousels(".fashion-products");
  initTabCarousels(".electronics-products");
});
