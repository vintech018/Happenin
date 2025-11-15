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
      calculateTotal(); 
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
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  }
  
  // --- NEW: Core function to calculate and aggregate all booking data ---
  function getEventAndTicketData() {
    const eventName = document.querySelector('.event-overlay h1')?.textContent.trim() || 'Selected Event';
    const showTimeElement = document.querySelector('.time-slot.selected');
    const eventDate = showTimeElement ? showTimeElement.textContent.trim() : 'Date/Time not selected';
    
    let subtotal = 0;
    let totalTickets = 0;
    const selectedTickets = [];

    quantityInputs.forEach(input => {
      // Ensure the quantity is a non-negative integer
      const quantity = Math.max(0, parseInt(input.value) || 0);
      input.value = quantity;
      
      const row = input.closest('.ticket-row');
      const category = row.dataset.category;
      const price = parseInt(row.dataset.price);
      
      subtotal += quantity * price;
      totalTickets += quantity;

      if (quantity > 0) {
          selectedTickets.push({ 
              category: category,
              price: price,
              quantity: quantity
          });
      }
    });

    const taxes = subtotal * TAX_RATE;
    const totalPayable = subtotal + taxes;

    return { 
        eventName, 
        eventDate,
        rawSubtotal: subtotal,
        rawFees: taxes,
        rawTotal: totalPayable, 
        totalTickets, 
        selectedTickets 
    };
  }
  // --- End Core function ---


  function calculateTotal() {
    // Get all calculated data from the core function
    const data = getEventAndTicketData();
    
    // Update the DOM elements using the data
    totalTicketsEl.textContent = data.totalTickets;
    subTotalEl.textContent = formatCurrency(data.rawSubtotal);
    feesEl.textContent = formatCurrency(data.rawFees);
    totalPriceEl.textContent = formatCurrency(data.rawTotal);

    // Disable/Enable checkout button (P3)
    checkoutBtn.disabled = data.totalTickets === 0;
    checkoutBtn.style.opacity = data.totalTickets === 0 ? 0.6 : 1;
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

  // --- Checkout Button Logic (UPDATED to save data) ---
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      const bookingData = getEventAndTicketData(); // Get the final data on click
      
      if (bookingData.totalTickets > 0) {
        // Save the booking data to localStorage before redirect
        localStorage.setItem('happeninBookingData', JSON.stringify(bookingData));
        
        // Redirect to the checkout page
        window.location.href = "checkout.html";
      } else {
        alert("Please select at least one ticket to proceed.");
      }
    });
  }
});