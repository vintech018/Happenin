// booking-page.js

document.addEventListener('DOMContentLoaded', function() {
  // --- Initialize Footer Year ---
  const yearElement = document.getElementById('year4');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // --- Time Slot Selection Logic (Existing) ---
  const timeSlots = document.querySelectorAll('.time-slot');
  timeSlots.forEach(slot => {
    slot.addEventListener('click', function() {
      timeSlots.forEach(s => s.classList.remove('selected'));
      this.classList.add('selected');
      console.log("Selected Show: " + this.dataset.time);
    });
  });

  // --- Ticket Calculation Logic ---
  const quantityInputs = document.querySelectorAll('.ticket-quantity');
  const totalTicketsEl = document.getElementById('totalTickets');
  const subTotalEl = document.getElementById('subTotal');
  const feesEl = document.getElementById('fees');
  const totalPriceEl = document.getElementById('totalPrice');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const TAX_RATE = 0.10; // 10% tax and fees

  // Helper to format currency
  function formatCurrency(amount) {
    // Ensures numbers are formatted with Indian locale and rounded
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  }

  function calculateTotal() {
    let subtotal = 0;
    let totalTickets = 0;

    quantityInputs.forEach(input => {
      // Ensure the quantity is a non-negative integer
      const quantity = Math.max(0, parseInt(input.value) || 0);
      input.value = quantity; // Update input value if it was negative/invalid
      
      const price = parseInt(input.closest('.ticket-row').dataset.price);
      
      subtotal += quantity * price;
      totalTickets += quantity;
    });

    const taxes = subtotal * TAX_RATE;
    const totalPayable = subtotal + taxes;

    // Update the DOM elements
    totalTicketsEl.textContent = totalTickets;
    subTotalEl.textContent = formatCurrency(subtotal);
    feesEl.textContent = formatCurrency(taxes);
    totalPriceEl.textContent = formatCurrency(totalPayable);

    // Disable/Enable checkout button (P3)
    checkoutBtn.disabled = totalTickets === 0;
    checkoutBtn.style.opacity = totalTickets === 0 ? 0.6 : 1;
  }

  // Attach the calculation function to all quantity inputs
  quantityInputs.forEach(input => {
    // Listen for change (blur, enter, up/down arrows) and input (typing)
    input.addEventListener('change', calculateTotal);
    input.addEventListener('input', calculateTotal);
  });
  
  // Initial calculation on page load
  calculateTotal();

  // --- Scroll to Top Button Functionality (Existing) ---
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      scrollToTopBtn.classList.toggle('show', window.pageYOffset > 300);
    });
    
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Checkout Button Placeholder (Existing) ---
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      const totalTickets = parseInt(totalTicketsEl.textContent) || 0;
      if (totalTickets > 0) {
        alert(`Initiating payment for ${totalTickets} tickets. Total amount: ${totalPriceEl.textContent}`);
        // This is DFD Process P3: Proceed to Checkout
      } else {
        alert("Please select at least one ticket to proceed.");
      }
    });
  }
});