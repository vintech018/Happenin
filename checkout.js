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

    // --- Hardcoded/Placeholder Order Data (In a real app, this would come from the server/session) ---
    let initialSubtotal = 7998;
    let initialFees = 799;
    let currentDiscount = 0;
    let finalAmount = initialSubtotal + initialFees;

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
        finalAmount = initialSubtotal + initialFees - currentDiscount;

        // Update DOM
        summaryDiscountEl.textContent = `- ${formatCurrency(currentDiscount)}`;
        summaryTotalEl.textContent = formatCurrency(finalAmount);
        finalAmountText.textContent = formatAmount(finalAmount);
    }

    // --- Utility Function ---
    function showStatusMessage(message, type) {
        statusMessage.classList.remove('hidden', 'success', 'error');
        statusMessage.classList.add(type);
        statusMessage.textContent = message;
    }
    
    // === NEW: Function to handle coupon application logic ===
    function applyCoupon(couponCode) {
        const code = couponCode.trim().toUpperCase();
        let discount = 0;
        let message = '';
        let type = 'error';

        // --- Coupon Validation and Discount Calculation (Must match codes from offers.html) ---
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
            payNowButton.innerHTML = `<i class="fas fa-dollar-sign"></i> Pay ${formatAmount(finalAmount)} Now`;
        }
    });

    // --- Initial Load Logic (UPDATED) ---
    
    // 1. Check for Coupon in URL
    const params = getQueryParams();
    const urlCoupon = params['coupon'];

    if (urlCoupon) {
        // Auto-fill input and apply coupon
        couponInput.value = urlCoupon;
        applyCoupon(urlCoupon);
    } else {
        // If no coupon in URL, just update summary initially
        updateSummary();
    }
    
    // Final setup
    payNowButton.disabled = false;
});