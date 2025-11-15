document.addEventListener('DOMContentLoaded', function() {
  // Selectors
  const dateSlots = document.querySelectorAll('#date-selection .time-slot');
  const timeSlots = document.querySelectorAll('#time-selection-2d .time-slot, #time-selection-3d .time-slot');
  const quantityInputs = document.querySelectorAll('.ticket-quantity');
  const selectSeatsBtn = document.getElementById('selectSeatsBtn');
  const totalTicketsEl = document.getElementById('totalTickets');
  const subTotalEl = document.getElementById('subTotal');
  
  // State
  let totalTickets = 2; // Initial quantity
  let subtotal = 600;   // Initial subtotal

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
            // Only remove 'selected' from other date slots
            document.querySelectorAll('#date-selection .time-slot').forEach(s => s.classList.remove('selected'));
        } else if (type === 'time') {
            // Remove 'selected' from all time slots (across all time sections)
            document.querySelectorAll('#time-selection-2d .time-slot, #time-selection-3d .time-slot').forEach(s => s.classList.remove('selected'));
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
    
    // Find selections
    const selectedDateEl = document.querySelector('#date-selection .time-slot.selected');
    const selectedTimeEl = document.querySelector('#time-selection-2d .time-slot.selected, #time-selection-3d .time-slot.selected');

    if (!selectedDateEl || !selectedTimeEl) {
        alert("Please select both a Date and a Showtime to continue.");
        return;
    }
    
    const selectedDate = selectedDateEl.dataset.time;
    const selectedTime = selectedTimeEl.dataset.time;

    // Store booking info in localStorage for the seat page to retrieve
    const bookingData = {
        eventName: 'Dune: Part Two (Grand Cinemas)',
        eventDate: selectedDate,
        showTime: selectedTime,
        tickets: totalTickets,
        subtotal: subtotal
    };
    localStorage.setItem('duneBookingInfo', JSON.stringify(bookingData));

    // Redirect to the seat selection page
    window.location.href = "dune-seats.html";
  });
  
  // Initial setup
  calculateTotal();
});