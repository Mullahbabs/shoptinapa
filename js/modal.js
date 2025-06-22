document.addEventListener("DOMContentLoaded", function () {
  // YouTube Modal Functionality
  const videoThumbnails = document.querySelectorAll(".video-thumbnail");
  const youtubeModal = document.querySelector(".youtube-modal");
  const youtubeIframe = document.getElementById("youtube-iframe");
  const closeModal = document.querySelector(".close-modal");

  // Open modal when thumbnail is clicked
  videoThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      const videoId = this.getAttribute("data-video-id");
      youtubeIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      youtubeModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal
  closeModal.addEventListener("click", function () {
    youtubeModal.classList.remove("active");
    youtubeIframe.src = "";
    document.body.style.overflow = "";
  });

  // Close when clicking outside modal
  youtubeModal.addEventListener("click", function (e) {
    if (e.target === youtubeModal) {
      youtubeModal.classList.remove("active");
      youtubeIframe.src = "";
      document.body.style.overflow = "";
    }
  });
});
