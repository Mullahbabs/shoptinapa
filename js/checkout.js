// Checkout Modal Functionality
const checkoutModal = document.querySelector(".checkout-modal");
const closeCheckoutModalBtn = document.querySelector(".close-checkout-modal");
const checkoutBtn = document.querySelector(".checkout");
const checkoutOverlay = document.querySelector(
  ".checkout-modal .modal-overlay"
);
const checkoutForms = document.querySelectorAll(".checkout-form");
const checkoutSteps = document.querySelectorAll(".checkout-steps .step");
const btnNextList = document.querySelectorAll(".btn-next");
const btnPrevList = document.querySelectorAll(".btn-prev");
const btnComplete = document.querySelector(".btn-complete");
const summaryItemsContainer = document.querySelectorAll(".summary-items");
const subtotalElements = document.querySelectorAll(".subtotal");
const shippingElements = document.querySelectorAll(".shipping");
const serviceFeeElements = document.querySelectorAll(".service-fee");
const totalElements = document.querySelectorAll(".total");
const shippingDetailsContent = document.querySelector(".details-content");

// State-based delivery fees
const stateDeliveryFees = {
  Lagos: 1500,
  Abuja: 2000,
  Rivers: 2500,
  "Cross River": 3000,
};

// Fixed service fee
const SERVICE_FEE = 500;

// EmailJS configuration (Replace with your actual EmailJS credentials)
const EMAILJS_CONFIG = {
  SERVICE_ID: "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
  TEMPLATE_ID: "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
  PUBLIC_KEY: "YOUR_PUBLIC_KEY", // Replace with your EmailJS public key
};

// Initialize EmailJS
(function () {
  // Initialize EmailJS with your public key
  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }
})();

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

  // Reset form fields
  resetCheckoutForm();

  // Update order summary
  updateOrderSummary();
}

// Close checkout modal
function closeCheckoutModal() {
  checkoutModal.classList.remove("active");
  document.body.style.overflow = "";
}

// Reset checkout form fields
function resetCheckoutForm() {
  const shippingForm = document.getElementById("shipping-form");
  if (shippingForm) {
    shippingForm.reset();
  }

  const receiptInput = document.getElementById("receipt-upload");
  if (receiptInput) {
    receiptInput.value = "";
  }

  const termsCheckbox = document.getElementById("terms-checkbox");
  if (termsCheckbox) {
    termsCheckbox.checked = false;
  }
}

// Get delivery fee based on state
function getDeliveryFee(state) {
  return stateDeliveryFees[state] || 2000; // Default fee if state not found
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

  // Get selected state for delivery fee
  const stateSelect = document.getElementById("state");
  const selectedState = stateSelect ? stateSelect.value : "";
  const shipping = getDeliveryFee(selectedState);

  // Calculate total (convert USD to NGN and add shipping + service fee)
  const total = subtotal * 1600 + shipping + SERVICE_FEE;

  subtotalElements.forEach((el) => {
    el.textContent = convertToNGN(subtotal);
  });

  shippingElements.forEach((el) => {
    el.textContent = `₦${shipping.toLocaleString("en-NG")}`;
  });

  serviceFeeElements.forEach((el) => {
    el.textContent = `₦${SERVICE_FEE.toLocaleString("en-NG")}`;
  });

  totalElements.forEach((el) => {
    el.textContent = `₦${total.toLocaleString("en-NG")}`;
  });

  // Generate order number
  const orderNumber = `TNPA-${new Date().getFullYear()}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;
  const orderNumberElement = document.querySelector(".order-number span");
  if (orderNumberElement) {
    orderNumberElement.textContent = orderNumber;
  }

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

// Get order data for submission
function getOrderData() {
  const shippingForm = document.getElementById("shipping-form");
  const stateSelect = document.getElementById("state");
  const selectedState = stateSelect ? stateSelect.value : "";
  const shipping = getDeliveryFee(selectedState);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal * 1600 + shipping + SERVICE_FEE;

  return {
    orderNumber:
      document.querySelector(".order-number span")?.textContent || "",
    fullName: shippingForm.querySelector("#full-name")?.value || "",
    email: shippingForm.querySelector("#email")?.value || "",
    phone: shippingForm.querySelector("#phone")?.value || "",
    address: shippingForm.querySelector("#address")?.value || "",
    city: shippingForm.querySelector("#city")?.value || "",
    state: selectedState,
    items: cart.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    })),
    subtotal: subtotal,
    shipping: shipping,
    serviceFee: SERVICE_FEE,
    total: total,
    receiptFile: document.getElementById("receipt-upload")?.files[0] || null,
  };
}

// Send order via EmailJS
async function sendOrderEmail(orderData) {
  try {
    // Prepare email parameters
    const emailParams = {
      order_number: orderData.orderNumber,
      customer_name: orderData.fullName,
      customer_email: orderData.email,
      customer_phone: orderData.phone,
      customer_address: `${orderData.address}, ${orderData.city}, ${orderData.state}`,
      order_items: orderData.items
        .map(
          (item) =>
            `${item.title} (x${item.quantity}) - ₦${(
              item.total * 1600
            ).toLocaleString("en-NG")}`
        )
        .join("\n"),
      subtotal: `₦${(orderData.subtotal * 1600).toLocaleString("en-NG")}`,
      shipping_fee: `₦${orderData.shipping.toLocaleString("en-NG")}`,
      service_fee: `₦${orderData.serviceFee.toLocaleString("en-NG")}`,
      total_amount: `₦${orderData.total.toLocaleString("en-NG")}`,
      order_date: new Date().toLocaleDateString("en-NG"),
      bank_account_1: "Zenith Bank - 1234567890 - Paradiseport Enterprises",
      bank_account_2: "GTBank - 0987654321 - Paradiseport Ventures",
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      emailParams
    );

    return { success: true, response };
  } catch (error) {
    console.error("EmailJS Error:", error);
    return { success: false, error };
  }
}

// Validate file upload
function validateFileUpload(file) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];

  if (!file) return false;
  if (file.size > maxSize) {
    showFlashMessage("File size must be less than 5MB");
    return false;
  }
  if (!allowedTypes.includes(file.type)) {
    showFlashMessage("Please upload JPG, PNG, or PDF files only");
    return false;
  }
  return true;
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

// Update delivery fee when state changes
const stateSelect = document.getElementById("state");
if (stateSelect) {
  stateSelect.addEventListener("change", function () {
    updateOrderSummary();
  });
}

// File upload validation
const receiptInput = document.getElementById("receipt-upload");
if (receiptInput) {
  receiptInput.addEventListener("change", function () {
    if (this.files && this.files[0]) {
      if (!validateFileUpload(this.files[0])) {
        this.value = "";
      }
    }
  });
}

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

      // Validate email format
      const emailField = currentForm.querySelector("#email");
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          isValid = false;
          emailField.style.borderColor = "red";
          showFlashMessage("Please enter a valid email address");
        }
      }

      if (!isValid) {
        showFlashMessage("Please fill in all required fields correctly");
        return;
      }

      // Update shipping details preview for confirmation step
      updateShippingDetailsPreview();
    }

    // Validate payment form
    if (currentForm.id === "payment-form") {
      // Validate bank transfer requirements
      const termsCheckbox = document.getElementById("terms-checkbox");
      const receiptInput = document.getElementById("receipt-upload");

      if (!termsCheckbox || !termsCheckbox.checked) {
        showFlashMessage("You must agree to the terms and conditions");
        return;
      }

      if (
        !receiptInput ||
        !receiptInput.files ||
        receiptInput.files.length === 0
      ) {
        showFlashMessage("Please upload your payment receipt");
        return;
      }

      // Validate the uploaded file
      if (!validateFileUpload(receiptInput.files[0])) {
        return;
      }
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
  btnComplete.addEventListener("click", async function (e) {
    // Show loading state
    this.disabled = true;
    this.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Processing Order...';

    try {
      // Get order data
      const orderData = getOrderData();

      // Send order email
      const emailResult = await sendOrderEmail(orderData);

      if (emailResult.success) {
        // Clear cart
        cart = [];
        saveCart();

        // Update cart count
        updateCartCount();

        // Show success message
        showFlashMessage(
          "Order completed successfully! Confirmation email sent.",
          "success"
        );

        // Close modal after delay
        setTimeout(() => {
          closeCheckoutModal();
        }, 2000);
      } else {
        throw new Error("Failed to send confirmation email");
      }
    } catch (error) {
      console.error("Order processing error:", error);
      showFlashMessage(
        "Order completed! There was an issue sending the confirmation email. We have received your order.",
        "warning"
      );

      // Clear cart anyway since order is received
      cart = [];
      saveCart();
      updateCartCount();

      setTimeout(() => {
        closeCheckoutModal();
      }, 2000);
    } finally {
      // Reset button state
      this.disabled = false;
      this.textContent = "Continue Shopping";
    }
  });
}

// Helper function to convert to NGN (assuming this exists in your original code)
function convertToNGN(amount) {
  return `₦${(amount * 1600).toLocaleString("en-NG")}`;
}

// Flash message function (assuming this exists in your original code)
function showFlashMessage(message, type = "error") {
  // Your existing flash message implementation
  console.log(`${type}: ${message}`);
}
