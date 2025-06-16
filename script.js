// Initialize the app (minimal for now, as dropdowns use CSS hover)

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  const mobileMenuOverlay = document.createElement('div');
  mobileMenuOverlay.className = 'mobile-menu-overlay';
  
  // Clone desktop navigation for mobile
  const navMenu = document.querySelector('.nav-menu').cloneNode(true);
  mobileMenu.appendChild(navMenu);
  document.body.appendChild(mobileMenu);
  document.body.appendChild(mobileMenuOverlay);
  
  // Add dropdown toggle functionality for mobile
  const mobileDropdowns = mobileMenu.querySelectorAll('.dropdown');
  mobileDropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('active');
    });
  });
  
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  mobileMenuOverlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Carousel Functionality
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.carousel-dots');
  let currentSlide = 0;
  let autoplayInterval;
  
  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.dot');
  
  function goToSlide(slideIndex) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (slideIndex + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Reset autoplay timer when manually changing slides
    resetAutoplay();
  }
  
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
  
  // Autoplay functionality
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }
  
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }
  
  // Initialize autoplay
  startAutoplay();
  
  // Pause autoplay on hover
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });
  
  carousel.addEventListener('mouseleave', startAutoplay);
  
  // Navigation controls
  document.querySelector('.next').addEventListener('click', nextSlide);
  document.querySelector('.prev').addEventListener('click', prevSlide);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });
  
  // Product Data (would normally come from an API)
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
      badge: "Bestseller"
    },
    {
      id: 2,
      title: "Organic Palm Oil (1L)",
      vendor: "Calabar Farms",
      price: 8.99,
      originalPrice: 10.99,
      image: "img/nb3.jpg",
      rating: 4.8,
      reviews: 36,
      badge: "Local"
    },
    {
      id: 3,
      title: "Wooden Elephant Sculpture",
      vendor: "Heritage Crafts",
      price: 32.50,
      originalPrice: 39.99,
      image: "img/products/sculpture.jpg",
      rating: 4.2,
      reviews: 15,
      badge: "New"
    },
    {
      id: 4,
      title: "African Print Shirt",
      vendor: "Tinapa Fashion",
      price: 28.75,
      originalPrice: 35.00,
      image: "img/products/shirt.jpg",
      rating: 4.6,
      reviews: 42,
      badge: "Trending"
    }
  ];
  
  // Render products
  const productGrid = document.querySelector('.product-grid');
  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    // Generate star rating HTML
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;
    let starsHtml = '';
    
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
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
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
          ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
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
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart') {
      const productCard = e.target.closest('.product-card');
      const productTitle = productCard.querySelector('.product-title').textContent;
      alert(`${productTitle} added to cart!`);
      // In a real app, you would add to cart logic here
    }
  });
});