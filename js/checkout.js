// Checkout Modal Functionality
const checkoutModal = document.querySelector(".checkout-modal");
const closeCheckoutModalBtn = document.querySelector(".close-checkout-modal");
const checkoutBtn = document.querySelector(".checkout");
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

// Open checkout modal
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
  let subtotal = 0;

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

      subtotal += item.price * item.quantity;
    });
  });

  // Update totals
  const shipping = 1500; // Fixed shipping cost in NGN
  const total = subtotal * 1600 + shipping; // Convert USD to NGN and add shipping

  subtotalElements.forEach((el) => {
    el.textContent = convertToNGN(subtotal);
  });

  totalElements.forEach((el) => {
    el.textContent = `₦${total.toLocaleString("en-NG")}`;
  });

  // Generate order number
  const orderNumber = `TNPA-${new Date().getFullYear()}-${Math.floor(
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

    const currentForm = this.closest(".checkout-form");
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

    // Here you would typically send the order to your backend
    // For demo purposes, we'll just show a success message and clear the cart

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
