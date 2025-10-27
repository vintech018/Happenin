// dune-seats.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Configuration ---
    const SEAT_ROWS = ['A', 'B', 'C', 'D', 'E'];
    const SEATS_PER_ROW = 10;
    const AISLE_AFTER_SEAT = 5; // Aisle will be between seat 5 and 6
    const OCCUPIED_SEATS = ['A1', 'A2', 'C5', 'D9', 'E10']; // Mock occupied seats
    const TAX_RATE = 0.10; 

    // --- DOM Elements ---
    const seatMapEl = document.getElementById('seatMap');
    const movieMetaEl = document.getElementById('movie-meta');
    const requiredTicketsEl = document.getElementById('summary-tickets-required');
    const selectedSeatsCountEl = document.getElementById('summary-seats-selected');
    const selectedSeatsListEl = document.getElementById('selectedSeatsList');
    const subTotalSummaryEl = document.getElementById('subTotalSummary');
    const feesSummaryEl = document.getElementById('feesSummary');
    const totalPriceSummaryEl = document.getElementById('totalPriceSummary');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // --- State ---
    // Load default or saved info. Initialized with dummy data for safety.
    let bookingInfo = { 
        tickets: 0, 
        subtotal: 0, 
        eventName: 'Dune: Part Two', 
        eventDate: 'Oct 27', 
        showTime: '02:45 PM',
        selectedTickets: [{ category: 'Premium', price: 250, quantity: 1 }, { category: 'Executive', price: 350, quantity: 1 }]
    };
    let selectedSeats = new Set();
    let totalTicketsRequired = 0;
    
    // --- Utility Functions ---
    function formatCurrency(amount) {
        return `₹${Math.round(amount).toLocaleString('en-IN')}`;
    }

    // --- Data Loading ---
    function loadBookingData() {
        const dataString = localStorage.getItem('duneBookingInfo');
        if (dataString) {
            try {
                // Merge data from the previous step
                const loadedData = JSON.parse(dataString);
                bookingInfo = { ...bookingInfo, ...loadedData };
            } catch(e) {
                console.error("Error parsing booking data from localStorage:", e);
            }
        }
        totalTicketsRequired = bookingInfo.tickets;
        
        // Update page headers and summaries
        movieMetaEl.innerHTML = `<i class="fas fa-calendar-alt"></i> ${bookingInfo.eventDate}, ${bookingInfo.showTime}`;
        requiredTicketsEl.textContent = `${totalTicketsRequired} tickets required`;
    }
    
    // --- Seat Map Generation ---
    function generateSeatMap() {
        seatMapEl.innerHTML = ''; // Clear map
        SEAT_ROWS.forEach((rowLetter) => {
            const rowEl = document.createElement('div');
            rowEl.className = 'seat-row';

            const labelEl = document.createElement('span');
            labelEl.className = 'row-label';
            labelEl.textContent = rowLetter;
            rowEl.appendChild(labelEl);
            
            for (let i = 1; i <= SEATS_PER_ROW; i++) {
                const seatId = rowLetter + i;
                const seatEl = document.createElement('span');
                seatEl.className = 'seat available';
                seatEl.dataset.seatId = seatId;
                seatEl.textContent = i;
                
                if (OCCUPIED_SEATS.includes(seatId)) {
                    seatEl.classList.remove('available');
                    seatEl.classList.add('occupied');
                    seatEl.title = 'Occupied';
                } else {
                    seatEl.addEventListener('click', handleSeatClick);
                }

                rowEl.appendChild(seatEl);

                // Add aisle gap
                if (i === AISLE_AFTER_SEAT) {
                    const aisleEl = document.createElement('span');
                    aisleEl.className = 'aisle';
                    rowEl.appendChild(aisleEl);
                }
            }
            seatMapEl.appendChild(rowEl);
        });
    }

    // --- Seat Selection Logic ---
    function handleSeatClick(e) {
        const seatEl = e.target;
        const seatId = seatEl.dataset.seatId;

        if (seatEl.classList.contains('selected')) {
            // Deselect seat
            seatEl.classList.remove('selected');
            selectedSeats.delete(seatId);
        } else {
            // Select seat
            if (selectedSeats.size < totalTicketsRequired) {
                seatEl.classList.add('selected');
                selectedSeats.add(seatId);
            } else {
                alert(`You can only select ${totalTicketsRequired} seats.`);
                return;
            }
        }
        
        updateSummaryPanel();
    }

    // --- Update Summary Panel ---
    function updateSummaryPanel() {
        const numSelected = selectedSeats.size;
        
        // Calculate costs (simplified logic: total price is proportional to selected seats)
        // Recalculate based on the ticket quantities from the previous step
        const subtotal = bookingInfo.subtotal;
        const fees = subtotal * TAX_RATE;
        const total = subtotal + fees;

        // Update counts
        selectedSeatsCountEl.textContent = `${numSelected} seats selected`;
        
        // Update list
        const sortedSeats = Array.from(selectedSeats).sort();
        selectedSeatsListEl.textContent = sortedSeats.length > 0 ? sortedSeats.join(', ') : 'None';
        
        // Update financials
        subTotalSummaryEl.textContent = formatCurrency(subtotal);
        feesSummaryEl.textContent = formatCurrency(fees);
        totalPriceSummaryEl.textContent = formatCurrency(total);
        
        // Update Checkout Button
        const isReady = numSelected === totalTicketsRequired && totalTicketsRequired > 0;
        checkoutBtn.disabled = !isReady;
        checkoutBtn.style.opacity = isReady ? 1 : 0.6;
        
        if (isReady) {
            // Prepare data for final checkout redirection
            const finalBookingData = {
                eventName: bookingInfo.eventName,
                eventDate: `${bookingInfo.eventDate}, ${bookingInfo.showTime}`,
                // Create a single entry for selected tickets for the final checkout logic
                selectedTickets: [{ 
                    category: `Selected Seats (${sortedSeats.join(', ')})`, 
                    price: subtotal, 
                    quantity: 1 
                }],
                rawSubtotal: subtotal,
                rawFees: fees,
                rawTotal: total,
                totalTickets: numSelected 
            };
            // Use the original key 'happeninBookingData' expected by checkout.js
            localStorage.setItem('happeninBookingData', JSON.stringify(finalBookingData));
            
            checkoutBtn.onclick = () => { window.location.href = "checkout.html"; };
        } else {
            checkoutBtn.onclick = null;
        }
    }

    // --- Initialization ---
    loadBookingData();
    generateSeatMap();
    updateSummaryPanel();
});