// checkout.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Initialize Footer Year ---
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // --- DOM Elements ---
    const paymentForm = document.getElementById('payment-form');
    const payNowButton = document.getElementById('pay-now-button');
    const finalAmountText = document.getElementById('finalAmountText');
    const couponInput = document.getElementById('coupon');
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    const summaryDiscountEl = document.getElementById('summary-discount');
    const summaryTotalEl = document.getElementById('summary-total');
    const statusMessage = document.getElementById('payment-status-message');
    
    // --- Summary DOM Elements ---
    const summaryEventNameEl = document.getElementById('summary-event-name');
    const summaryTicketDetailsEl = document.getElementById('summary-ticket-details');
    const summarySubtotalPriceEl = document.getElementById('summary-subtotal-price');
    const summaryFeesPriceEl = document.getElementById('summary-fees-price');
    // --- End Summary DOM Elements ---

    // --- Price Data (Initialized by loadBookingData) ---
    let initialSubtotal = 0; 
    let initialFees = 0;      
    let currentDiscount = 0;
    let finalAmount = 0; 

    // UPI ID for the QR code display in the modal
    const UPI_ID = "*****8456@upi";


    // Helper to format currency
    function formatCurrency(amount) {
        return `₹${Math.round(amount).toLocaleString('en-IN')}`;
    }
    
    // Helper to format amount for button display
    function formatAmount(amount) {
        return Math.round(amount).toLocaleString('en-IN', {minimumFractionDigits: 0});
    }

    // --- Core Logic: Update Totals ---
    function updateSummary() {
        finalAmount = Math.max(0, initialSubtotal + initialFees - currentDiscount); 

        // Update DOM
        summaryDiscountEl.textContent = `- ${formatCurrency(currentDiscount)}`;
        summaryTotalEl.textContent = formatCurrency(finalAmount);
        finalAmountText.textContent = formatAmount(finalAmount);
        
        // Update pay button text/state
        payNowButton.innerHTML = `<i class="fas fa-arrow-right"></i> Proceed to Pay ₹${formatAmount(finalAmount)}`;
        payNowButton.disabled = finalAmount <= 0;
        payNowButton.style.opacity = finalAmount <= 0 ? 0.6 : 1;
    }

    // --- Utility Function ---
    function showStatusMessage(message, type) {
        statusMessage.classList.remove('hidden', 'success', 'error');
        statusMessage.classList.add(type);
        statusMessage.textContent = message;
    }
    
    // === Function to load booking data and update the checkout page ===
    function loadBookingData() {
        const bookingDataString = localStorage.getItem('happeninBookingData');
        
        if (!bookingDataString) {
            showStatusMessage('Warning: Could not retrieve booking details. Showing placeholder data. Prices are for demonstration.', 'error');
            initialSubtotal = 7998; 
            initialFees = 799;      
            summaryEventNameEl.textContent = 'Event Details Missing';
            summaryTicketDetailsEl.textContent = 'Please return to booking page.';
        } else {
            const bookingData = JSON.parse(bookingDataString);

            initialSubtotal = bookingData.rawSubtotal;
            initialFees = bookingData.rawFees;
            
            summaryEventNameEl.textContent = bookingData.eventName;
            
            const ticketDetails = bookingData.selectedTickets.map(t => `${t.category} x ${t.quantity}`).join(', ');
            summaryTicketDetailsEl.textContent = `${bookingData.eventDate}, ${ticketDetails}`;

            summarySubtotalPriceEl.textContent = formatCurrency(initialSubtotal);
            summaryFeesPriceEl.textContent = formatCurrency(initialFees);
            
            localStorage.removeItem('happeninBookingData');
        }
        
        updateSummary();
    }
    
    // === Function to handle coupon application logic ===
    function applyCoupon(couponCode) {
        const code = couponCode.trim().toUpperCase();
        let discount = 0;
        let message = '';
        let type = 'error';

        // --- Coupon Validation and Discount Calculation ---
        if (code === 'HAPPENIN20') {
            discount = Math.round(initialSubtotal * 0.20); 
            message = `Coupon "${code}" applied successfully! You saved ${formatCurrency(discount)}.`;
            type = 'success';
        } else if (code === 'FREESTUFF') {
             discount = 500; 
             message = `Coupon "${code}" applied successfully! You saved ${formatCurrency(discount)}.`;
             type = 'success';
        } else if (code === 'NEWUSER') { 
             discount = 150; 
             message = `Coupon "${code}" applied successfully! You saved ${formatCurrency(discount)}.`;
             type = 'success';
        } else if (code === 'WEEKEND50') { 
             discount = 200; 
             message = `Coupon "${code}" applied successfully! You saved ${formatCurrency(discount)}.`;
             type = 'success';
        } else {
            discount = 0;
            message = 'Invalid coupon code. Please try again.';
            type = 'error';
        }

        currentDiscount = discount;
        showStatusMessage(message, type);
        updateSummary();
    }
    
    // === Function to get URL parameters ===
    function getQueryParams() {
        const params = {};
        const urlParams = new URLSearchParams(window.location.search);
        for (const [key, value] of urlParams) {
            params[key] = value;
        }
        return params;
    }


    // --- Coupon Event Listener ---
    applyCouponBtn.addEventListener('click', function() {
        applyCoupon(couponInput.value);
    });

    // ====================================================================
    // === MODAL DISPLAY LOGIC (Replaces payment submission) ===
    // ====================================================================
    
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const buyerName = document.getElementById('name').value.trim();
        const buyerEmail = document.getElementById('email').value.trim();
        
        if (!buyerName || !buyerEmail) {
            showStatusMessage('Please fill in your Name and Email to proceed.', 'error');
            return;
        }

        if (finalAmount <= 0) {
            showStatusMessage('Payment successful! Total amount was ₹0. Booking Confirmed.', 'success');
            payNowButton.textContent = 'BOOKING CONFIRMED';
            payNowButton.disabled = true;
            return;
        }
        
        // Final amount is calculated and ready, display modal
        // This function is defined in payment-modal.js
        if (typeof openPaymentModal === 'function') {
             openPaymentModal(finalAmount, UPI_ID);
        } else {
             alert("Error: Payment modal script not loaded.");
        }
    });

    // --- Initial Load Logic ---
    
    loadBookingData(); 
    
    const params = getQueryParams();
    const urlCoupon = params['coupon'];

    if (urlCoupon) {
        couponInput.value = urlCoupon;
        applyCoupon(urlCoupon); 
    }
});