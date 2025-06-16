// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("Tinapa E-Commerce JS initialized");

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Check for saved user preference
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.checked = true;
  }

  // Toggle dark mode
  darkModeToggle.addEventListener("change", function () {
    if (this.checked) {
      body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  });
  // =====================
  // Mobile Menu Functionality
  // =====================
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuToggle && navMenu) {
    // Create mobile menu elements
    const mobileMenu = document.createElement("div");
    mobileMenu.className = "mobile-menu";
    const mobileMenuOverlay = document.createElement("div");
    mobileMenuOverlay.className = "mobile-menu-overlay";

    // Clone navigation for mobile
    const clonedNav = navMenu.cloneNode(true);
    mobileMenu.appendChild(clonedNav);
    document.body.appendChild(mobileMenu);
    document.body.appendChild(mobileMenuOverlay);

    // Add dropdown toggle functionality
    const mobileDropdowns = mobileMenu.querySelectorAll(".dropdown");
    mobileDropdowns.forEach((dropdown) => {
      const link = dropdown.querySelector(".nav-link");
      link.addEventListener("click", function (e) {
        e.preventDefault();
        dropdown.classList.toggle("active");
      });
    });

    // Toggle menu visibility
    mobileMenuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      mobileMenuOverlay.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close menu when overlay is clicked
    mobileMenuOverlay.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      mobileMenuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  // =====================
  // Carousel Functionality
  // =====================
  const carousel = document.querySelector(".carousel");
  if (carousel) {
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".carousel-dots");
    let currentSlide = 0;
    let autoplayInterval;

    // Only initialize if slides exist
    if (slides.length > 0) {
      // Create dots
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

      // Initialize autoplay
      startAutoplay();

      // Pause on hover
      carousel.addEventListener("mouseenter", () => {
        clearInterval(autoplayInterval);
      });

      carousel.addEventListener("mouseleave", startAutoplay);

      // Navigation controls
      const nextBtn = document.querySelector(".next");
      const prevBtn = document.querySelector(".prev");

      if (nextBtn) nextBtn.addEventListener("click", nextSlide);
      if (prevBtn) prevBtn.addEventListener("click", prevSlide);

      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
      });
    }
  }

  // =====================
  // Product Cards
  // =====================
  const productGrid = document.querySelector(".product-grid");
  if (productGrid) {
    // Sample product data - in real app this would come from an API
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
        vendor: "Gigs &amp; Gadgets",
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
      // ... (other product data)
    ];

    // Render products
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      // Generate star rating HTML
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
  ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
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
      <span class="current-price">$${product.price.toFixed(2)}</span>
      ${
        product.originalPrice
          ? `<span class="original-price">$${product.originalPrice.toFixed(
              2
            )}</span>`
          : ""
      }
    </div>
    <div class="product-actions">
      <button class="add-to-cart">Add to Cart</button>
      <button class="wishlist-btn"><i class="far fa-heart"></i></button>
    </div>
  </div>
`;

      productGrid.appendChild(productCard);
    });

    // Add to cart functionality
    document.addEventListener("click", function (e) {
      if (
        e.target.classList.contains("add-to-cart") ||
        e.target.closest(".add-to-cart")
      ) {
        const productCard = e.target.closest(".product-card");
        const productTitle =
          productCard.querySelector(".product-title").textContent;
        console.log(`Added to cart: ${productTitle}`);
        // In real app, add to cart logic here
      }
    });
  }
});

// Error handling for Font Awesome if needed
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

// Sample product data for the modal (in reality, you'd fetch this from your backend)
const detailedProducts = {
  1: {
    title: "Handwoven Raffia Bag",
    vendor: "CR Crafts",
    price: 45.99,
    originalPrice: 59.99,
    description:
      "Beautifully handcrafted raffia bag made by local artisans in Cross River. Perfect for casual outings and beach trips. Features intricate patterns and durable construction.",
    images: [
      "img/products/bag.jpg",
      "img/products/bag-2.jpg",
      "img/products/bag-3.jpg",
    ],
    rating: 4.5,
    reviews: 24,
  },
  // Add similar data for other products
};

// Open modal when quick view button is clicked
document.addEventListener("click", function (e) {
  if (e.target.closest(".quick-view-btn")) {
    const productId = e.target.closest(".quick-view-btn").dataset.productId;
    openQuickViewModal(productId);
  }
});

// Close modal
closeModalBtn.addEventListener("click", closeQuickViewModal);
modalOverlay.addEventListener("click", closeQuickViewModal);

// Close when pressing Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && quickViewModal.classList.contains("active")) {
    closeQuickViewModal();
  }
});

function openQuickViewModal(productId) {
  const product = detailedProducts[productId];
  if (!product) return;

  // Set product data in modal
  document.querySelector(".modal-product-info .product-title").textContent =
    product.title;
  document.querySelector(".modal-product-info .vendor").textContent =
    product.vendor;
  document.querySelector(
    ".modal-product-info .current-price"
  ).textContent = `$${product.price.toFixed(2)}`;

  if (product.originalPrice) {
    document.querySelector(
      ".modal-product-info .original-price"
    ).textContent = `$${product.originalPrice.toFixed(2)}`;
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

  // Set rating
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

  // Set images
  const mainImage = document.querySelector(".main-image img");
  const thumbnailContainer = document.querySelector(".thumbnail-container");

  mainImage.src = product.images[0];
  mainImage.alt = product.title;

  thumbnailContainer.innerHTML = "";

  product.images.forEach((img, index) => {
    const thumbnail = document.createElement("div");
    thumbnail.className = `thumbnail ${index === 0 ? "active" : ""}`;
    thumbnail.innerHTML = `<img src="${img}" alt="${product.title} Thumbnail ${
      index + 1
    }">`;
    thumbnail.addEventListener("click", () => {
      mainImage.src = img;
      document
        .querySelectorAll(".thumbnail")
        .forEach((t) => t.classList.remove("active"));
      thumbnail.classList.add("active");
    });
    thumbnailContainer.appendChild(thumbnail);
  });

  // Open modal
  quickViewModal.classList.add("active");
  document.body.style.overflow = "hidden";
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
});
