// ==================== HERO CAROUSEL ====================
function initHeroCarousel() {
  const heroCarousel = document.querySelector(".hero .carousel");
  if (!heroCarousel) return;

  const slides = heroCarousel.querySelectorAll(".slide");
  const dotsContainer = heroCarousel.querySelector(".carousel-dots");
  const prevBtn = heroCarousel.querySelector(".carousel-prev");
  const nextBtn = heroCarousel.querySelector(".carousel-next");

  let currentIndex = 0;
  let autoSlideInterval;
  const slideInterval = 5000; // 5 seconds

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".carousel-dot");

  // Initialize first slide
  updateCarousel();

  // Start auto-sliding
  startAutoSlide();

  // Navigation functions
  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    updateCarousel();
    resetAutoSlide();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function updateCarousel() {
    // Update slides
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentIndex);
      slide.setAttribute("aria-hidden", index !== currentIndex);
    });

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    // Update ARIA live region for screen readers
    const activeSlide = slides[currentIndex];
    const slideTitle = activeSlide.querySelector("h2")?.textContent || "Slide";
    const slideDesc = activeSlide.querySelector("p")?.textContent || "";
    heroCarousel.setAttribute("aria-live", "off");
    setTimeout(() => {
      heroCarousel.setAttribute("aria-live", "polite");
      heroCarousel.setAttribute(
        "aria-label",
        `Current slide: ${slideTitle}. ${slideDesc}`
      );
    }, 100);
  }

  // Auto-slide functions
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, slideInterval);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Event listeners
  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    prevSlide();
  });

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    nextSlide();
  });

  // Pause on hover/focus
  heroCarousel.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });

  heroCarousel.addEventListener("mouseleave", () => {
    resetAutoSlide();
  });

  // Keyboard navigation
  heroCarousel.addEventListener("keydown", (e) => {
    if (
      e.target.closest(".carousel-dot") &&
      (e.key === "Enter" || e.key === " ")
    ) {
      e.preventDefault();
      return;
    }

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        prevSlide();
        break;
      case "ArrowRight":
        e.preventDefault();
        nextSlide();
        break;
      case "Home":
        e.preventDefault();
        goToSlide(0);
        break;
      case "End":
        e.preventDefault();
        goToSlide(slides.length - 1);
        break;
    }
  });

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    clearInterval(autoSlideInterval);
  });
}

// Initialize the hero carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", initHeroCarousel);
