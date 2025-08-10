document.addEventListener("DOMContentLoaded", function () {
  // Set the date we're counting down to (adjust this to your offer end date)
  const countDownDate = new Date();
  countDownDate.setDate(countDownDate.getDate() + 7); // 7 days from now

  // Update the countdown every 1 second
  const countdownFunction = setInterval(function () {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the countdown date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");

    // If the countdown is finished, show expired message
    if (distance < 0) {
      clearInterval(countdownFunction);
      document.querySelector(".countdown-clock").innerHTML =
        '<div class="expired-message">OFFER EXPIRED!</div>';
    }
  }, 1000);
});
