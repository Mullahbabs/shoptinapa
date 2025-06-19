// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("Tinapa E-Commerce JS initialized");

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
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuToggle && navMenu) {
    const mobileMenu = document.createElement("div");
    mobileMenu.className = "mobile-menu";
    const mobileMenuOverlay = document.createElement("div");
    mobileMenuOverlay.className = "mobile-menu-overlay";

    const clonedNav = navMenu.cloneNode(true);
    mobileMenu.appendChild(clonedNav);
    document.body.appendChild(mobileMenu);
    document.body.appendChild(mobileMenuOverlay);

    const mobileDropdowns = mobileMenu.querySelectorAll(".dropdown");
    mobileDropdowns.forEach((dropdown) => {
      const link = dropdown.querySelector(".nav-link");
      link.addEventListener("click", function (e) {
        e.preventDefault();
        dropdown.classList.toggle("active");
      });
    });

    mobileMenuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      mobileMenuOverlay.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    mobileMenuOverlay.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      mobileMenuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
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

    document.addEventListener("click", function (e) {
      if (
        e.target.classList.contains("add-to-cart") ||
        e.target.closest(".add-to-cart")
      ) {
        const productCard = e.target.closest(".product-card");
        const productTitle =
          productCard.querySelector(".product-title").textContent;
        console.log(`Added to cart: ${productTitle}`);
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
      originalPrice: 59.99,
      description:
        "Beautifully handcrafted raffia bag made by local artisans in Cross River.",
      images: [
        "img/products/bag.jpg",
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

  closeModalBtn.addEventListener("click", closeQuickViewModal);
  modalOverlay.addEventListener("click", closeQuickViewModal);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && quickViewModal.classList.contains("active")) {
      closeQuickViewModal();
    }
  });

  function openQuickViewModal(productId) {
    const product = detailedProducts[productId];
    if (!product) return;

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
        title: "Handcarved Wooden Bowl",
        vendor: "CR Artisans",
        price: 34.99,
        originalPrice: 42.99,
        image: "img/products/wooden-bowl.jpg",
        rating: 4.9,
        reviews: 56,
        badge: "Local",
      },
      // ... other local products
    ],
    deals: [
      {
        id: 301,
        title: "Smart Watch",
        vendor: "TechDeals",
        price: 89.99,
        originalPrice: 129.99,
        image: "img/products/smartwatch.jpg",
        rating: 4.5,
        reviews: 214,
        badge: "30% Off",
      },
      // ... other deals products with unique IDs
    ],
    male: [
      {
        id: 401,
        title: "Men's Ankara Shirt",
        vendor: "CR Fashion",
        price: 39.99,
        originalPrice: 49.99,
        image: "img/male-shirt.jpg",
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
        image: "img/male-loafers.jpg",
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
        image: "img/male-blazer.jpg",
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
        image: "img/male-jeans.jpg",
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
        image: "img/male-tee.jpg",
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
        image: "img/male-watch.jpg",
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
        image: "img/female-dress.jpg",
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
        image: "img/female-heels.jpg",
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
        image: "img/female-handbag.jpg",
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
        image: "img/female-skirt.jpg",
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
        image: "img/female-blouse.jpg",
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
        image: "img/female-necklace.jpg",
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
        image: "img/unisex-hoodie.jpg",
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
        image: "img/unisex-sneakers.jpg",
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
        image: "img/unisex-backpack.jpg",
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
        image: "img/unisex-cap.jpg",
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
        image: "img/unisex-sunglasses.jpg",
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
        image: "img/unisex-wristband.jpg",
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
        image: "img/general-tv.jpg",
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
        image: "img/general-laptop.jpg",
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
        image: "img/general-theater.jpg",
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
        image: "img/general-desktop.jpg",
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
        image: "img/general-console.jpg",
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
        image: "img/general-projector.jpg",
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
        image: "img/phones-pro.jpg",
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
        image: "img/phones-budget.jpg",
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
        image: "img/phones-flagship.jpg",
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
        image: "img/phones-midrange.jpg",
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
        image: "img/phones-foldable.jpg",
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
        image: "img/phones-rugged.jpg",
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
        image: "img/accessories-charger.jpg",
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
        image: "img/accessories-earbuds.jpg",
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
        image: "img/accessories-case.jpg",
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
        image: "img/accessories-protector.jpg",
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
        image: "img/accessories-band.jpg",
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
        image: "img/accessories-cable.jpg",
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
      nextBtn.disabled = false; // Always enabled due to looping
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
