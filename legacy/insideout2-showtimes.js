// insideout2-showtimes.js

document.addEventListener('DOMContentLoaded', function() {
  // Selectors
  const dateSlots = document.querySelectorAll('#date-selection .time-slot');
  const timeSlots = document.querySelectorAll('#time-selection-3d .time-slot, #time-selection-2d .time-slot');
  const quantityInputs = document.querySelectorAll('.ticket-quantity');
  const selectSeatsBtn = document.getElementById('selectSeatsBtn');
  const totalTicketsEl = document.getElementById('totalTickets');
  const subTotalEl = document.getElementById('subTotal');
  
  // State
  let totalTickets = 2; 
  let subtotal = 500;   

  // --- Core Calculation Logic ---
  function calculateTotal() {
    subtotal = 0;
    totalTickets = 0;
    
    quantityInputs.forEach(input => {
      const quantity = Math.max(0, parseInt(input.value) || 0);
      input.value = quantity;
      
      const row = input.closest('.ticket-row');
      const price = parseInt(row.dataset.price);
      
      subtotal += quantity * price;
      totalTickets += quantity;
    });
    
    // Update DOM
    totalTicketsEl.textContent = totalTickets;
    subTotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

    // Enable/Disable button
    selectSeatsBtn.disabled = totalTickets === 0;
    selectSeatsBtn.style.opacity = totalTickets === 0 ? 0.6 : 1;
  }
  
  // --- Event Handlers ---
  
  // 1. Date and Time Slot Selection
  function addTimeSlotListeners(slots, type) {
    slots.forEach(slot => {
      slot.addEventListener('click', function() {
        if (type === 'date') {
            document.querySelectorAll('#date-selection .time-slot').forEach(s => s.classList.remove('selected'));
        } else {
            // Remove selection across all time sections
            document.querySelectorAll('#time-selection-3d .time-slot, #time-selection-2d .time-slot').forEach(s => s.classList.remove('selected'));
        }
        
        this.classList.add('selected');
      });
    });
  }
  
  addTimeSlotListeners(dateSlots, 'date');
  addTimeSlotListeners(timeSlots, 'time');
  
  // 2. Quantity Input Listeners
  quantityInputs.forEach(input => {
    input.addEventListener('change', calculateTotal);
    input.addEventListener('input', calculateTotal);
  });
  
  // 3. Proceed to Select Seats Button Logic
  selectSeatsBtn.addEventListener('click', function() {
    if (totalTickets === 0) {
        alert("Please select at least one ticket.");
        return;
    }
    
    const selectedDateEl = document.querySelector('#date-selection .time-slot.selected');
    const selectedTimeEl = document.querySelector('#time-selection-3d .time-slot.selected, #time-selection-2d .time-slot.selected');

    if (!selectedDateEl || !selectedTimeEl) {
        alert("Please select both a Date and a Showtime to continue.");
        return;
    }
    
    const selectedDate = selectedDateEl.dataset.time;
    const selectedTime = selectedTimeEl.dataset.time;

    // Store booking info in localStorage
    const bookingData = {
        eventName: 'Inside Out 2 (Pixar Cinemas)',
        eventDate: selectedDate,
        showTime: selectedTime,
        tickets: totalTickets,
        subtotal: subtotal
    };
    localStorage.setItem('insideout2BookingInfo', JSON.stringify(bookingData));

    // Redirect to the seat selection page
    window.location.href = "insideout2-seats.html";
  });
  
  // Initial setup
  calculateTotal();
});