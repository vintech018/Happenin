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
    
    // --- New DOM Elements for Dynamic Summary (Must match checkout.html IDs) ---
    const summaryEventNameEl = document.getElementById('summary-event-name');
    const summaryTicketDetailsEl = document.getElementById('summary-ticket-details');
    const summarySubtotalPriceEl = document.getElementById('summary-subtotal-price');
    const summaryFeesPriceEl = document.getElementById('summary-fees-price');
    // --- End New DOM Elements ---

    // --- Price Data (Initialized by loadBookingData) ---
    let initialSubtotal = 0; 
    let initialFees = 0;      
    let currentDiscount = 0;
    let finalAmount = 0; 
    // --- End Price Data ---

    // Helper to format currency (reused from booking-page.js pattern)
    function formatCurrency(amount) {
        return `₹${Math.round(amount).toLocaleString('en-IN')}`;
    }
    
    // Helper to remove '₹' and commas for button display
    function formatAmount(amount) {
        return Math.round(amount).toLocaleString('en-IN', {minimumFractionDigits: 0});
    }

    // --- Core Logic: Update Totals ---
    function updateSummary() {
        // Recalculate the final amount with current discount
        finalAmount = Math.max(0, initialSubtotal + initialFees - currentDiscount); // Ensure amount isn't negative

        // Update DOM
        summaryDiscountEl.textContent = `- ${formatCurrency(currentDiscount)}`;
        summaryTotalEl.textContent = formatCurrency(finalAmount);
        payNowButton.innerHTML = `<i class="fas"></i> Pay ${formatAmount(finalAmount)} Now`;
        payNowButton.disabled = finalAmount <= 0;
        payNowButton.style.opacity = finalAmount <= 0 ? 0.6 : 1;
    }

    // --- Utility Function ---
    function showStatusMessage(message, type) {
        statusMessage.classList.remove('hidden', 'success', 'error');
        statusMessage.classList.add(type);
        statusMessage.textContent = message;
    }
    
    // === NEW: Function to load booking data and update the checkout page ===
    function loadBookingData() {
        const bookingDataString = localStorage.getItem('happeninBookingData');
        
        if (!bookingDataString) {
            // Fallback for direct access or no data
            showStatusMessage('Warning: Could not retrieve booking details. Showing placeholder data. Prices are for demonstration.', 'error');
            initialSubtotal = 7998; // Fallback value
            initialFees = 799;      // Fallback value
            summaryEventNameEl.textContent = 'Event Details Missing';
            summaryTicketDetailsEl.textContent = 'Please return to booking page.';
        } else {
            const bookingData = JSON.parse(bookingDataString);

            // 1. Update initial price variables (using raw numbers)
            initialSubtotal = bookingData.rawSubtotal;
            initialFees = bookingData.rawFees;
            
            // 2. Update descriptive summary text
            summaryEventNameEl.textContent = bookingData.eventName;
            
            // Build ticket details string: Category x Quantity
            const ticketDetails = bookingData.selectedTickets.map(t => `${t.category} x ${t.quantity}`).join(', ');
            summaryTicketDetailsEl.textContent = `${bookingData.eventDate}, ${ticketDetails}`;

            // 3. Update price breakdown display with new initial values
            summarySubtotalPriceEl.textContent = formatCurrency(initialSubtotal);
            summaryFeesPriceEl.textContent = formatCurrency(initialFees);
            
            // Clean up localStorage to prevent old data from being used next time
            localStorage.removeItem('happeninBookingData');
        }
        
        // Final update for initial load state
        updateSummary();
    }
    
    // === NEW: Function to handle coupon application logic (uses initialSubtotal) ===
    function applyCoupon(couponCode) {
        const code = couponCode.trim().toUpperCase();
        let discount = 0;
        let message = '';
        let type = 'error';

        // --- Coupon Validation and Discount Calculation ---
        if (code === 'HAPPENIN20') {
            discount = Math.round(initialSubtotal * 0.20); // 20% discount on subtotal
            message = `Coupon "${code}" applied successfully! You saved ${formatCurrency(discount)}.`;
            type = 'success';
        } else if (code === 'FREESTUFF') {
             discount = 500; // Fixed discount
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
    
    // === NEW: Function to get URL parameters ===
    function getQueryParams() {
        const params = {};
        const urlParams = new URLSearchParams(window.location.search);
        for (const [key, value] of urlParams) {
            params[key] = value;
        }
        return params;
    }


    // --- Coupon Event Listener (calls the new dedicated function) ---
    applyCouponBtn.addEventListener('click', function() {
        applyCoupon(couponInput.value);
    });

    // --- Stripe Integration Placeholder (Process P3) ---
    paymentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Check if there's anything to pay
        if (finalAmount <= 0) {
            showStatusMessage('Payment successful! Total amount was ₹0. Redirecting...', 'success');
            payNowButton.textContent = 'Payment Complete!';
            return;
        }
        
        // Disable button to prevent double submission
        payNowButton.disabled = true;
        payNowButton.textContent = 'Processing...';
        
        const customerEmail = document.getElementById('email').value;

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        
        // --- Simulated Payment Result ---
        const paymentSuccessful = Math.random() > 0.1; // 90% success rate
        
        if (paymentSuccessful) {
            // Process P4: Confirm Booking & Send E-Ticket
            showStatusMessage('Payment successful! Your total of ' + formatCurrency(finalAmount) + ' has been processed. Redirecting to confirmation page...', 'success');
            // setTimeout(() => window.location.href = 'confirmation.html', 3000); // Redirect on success
            payNowButton.textContent = 'Payment Complete!';
        } else {
            showStatusMessage('Payment failed: The card transaction was declined. Please check your details or try a different method.', 'error');
            payNowButton.disabled = false;
            payNowButton.innerHTML = `<i class="fas"></i> Pay ${formatAmount(finalAmount)} Now`;
        }
    });

    // --- Initial Load Logic (UPDATED) ---
    
    // 1. Load data from previous page and update initial price variables
    loadBookingData(); 
    
    // 2. Check for Coupon in URL
    const params = getQueryParams();
    const urlCoupon = params['coupon'];

    if (urlCoupon) {
        // Auto-fill input and apply coupon
        couponInput.value = urlCoupon;
        applyCoupon(urlCoupon); 
    }
    
    // Final setup
    payNowButton.disabled = false;
});