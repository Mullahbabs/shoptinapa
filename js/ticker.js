// Initialize partners ticker
document.addEventListener("DOMContentLoaded", function () {
  const partnersTicker = document.querySelector(".partners-ticker");

  if (partnersTicker) {
    // Clone logos for infinite loop (done in HTML for better performance)

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    partnersTicker.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    partnersTicker.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (Math.abs(touchEndX - touchStartX) > 50) {
          const track = partnersTicker.querySelector(".partners-track");
          track.style.animationPlayState = "paused";
          setTimeout(() => {
            track.style.animationPlayState = "running";
          }, 1000);
        }
      },
      { passive: true }
    );

    // Pause/play on focus/blur for accessibility
    partnersTicker.addEventListener("focusin", () => {
      partnersTicker.querySelector(".partners-track").style.animationPlayState =
        "paused";
    });

    partnersTicker.addEventListener("focusout", () => {
      partnersTicker.querySelector(".partners-track").style.animationPlayState =
        "running";
    });
  }
});
