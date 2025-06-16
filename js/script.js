// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("Tinapa E-Commerce JS initialized");

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
        title: "Handwoven Raffia Bag",
        vendor: "CR Crafts",
        price: 45.99,
        originalPrice: 59.99,
        image: "img/nb11.jpg",
        rating: 4.5,
        reviews: 24,
        badge: "Bestseller",
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
        ${
          product.badge
            ? `<span class="product-badge">${product.badge}</span>`
            : ""
        }
        <div class="product-image">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
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
