// payment-modal.js

function openPaymentModal(finalAmount, upiId) {
    const backdrop = document.getElementById('paymentModalBackdrop');
    const amountDisplay = document.getElementById('modalFinalAmount');
    const upiIdText = document.getElementById('modalUpiIdText');
    const confirmationBtn = document.getElementById('modalConfirmationBtn');

    // Update dynamic content
    amountDisplay.textContent = `₹${finalAmount.toLocaleString('en-IN')}`;
    upiIdText.textContent = `UPI ID: ${upiId}`;
    confirmationBtn.textContent = `I have paid ₹${finalAmount.toLocaleString('en-IN')}`;
    
    // Show the modal
    backdrop.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Attach confirmation handler
    confirmationBtn.onclick = handleModalConfirmation;
}

function closePaymentModal() {
    const backdrop = document.getElementById('paymentModalBackdrop');
    backdrop.classList.remove('show');
    document.body.style.overflow = '';
}

function handleModalConfirmation() {
    // Retrieve user name
    const userName = localStorage.getItem('checkoutUserName') || 'Happenin User';

    // Simulate API call delay for "processing" after user clicks confirmation
    const confirmationBtn = document.getElementById('modalConfirmationBtn');
    
    confirmationBtn.disabled = true;
    confirmationBtn.textContent = 'Verifying Payment... (Simulated)';
    confirmationBtn.style.backgroundColor = '#ffc107'; // Amber/Yellow for processing

    setTimeout(() => {
        
        // Hide modal
        closePaymentModal();
        
        // Update main checkout page status to SUCCESS
        const finalAmount = document.getElementById('modalFinalAmount').textContent;
        const statusMessage = document.getElementById('payment-status-message');
        
        // Personalized confirmation message
        statusMessage.classList.remove('hidden', 'error');
        statusMessage.classList.add('success');
        statusMessage.textContent = `✅ Success, ${userName}! Your payment of ${finalAmount} is confirmed. You will be redirected to your account dashboard shortly.`;
        
        // Lock the main form
        document.getElementById('pay-now-button').disabled = true;
        document.getElementById('pay-now-button').textContent = 'BOOKING CONFIRMED';

        // Scroll to the confirmation message
        statusMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // NEW: Redirect to index.html (simulating account page) after a short delay
        setTimeout(() => {
             window.location.href = "index.html"; 
        }, 3000); // 3 second delay before redirect

    }, 2000); // 2 second mock delay
}

// Attach event listener to the close button in the modal
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.modal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closePaymentModal);
    }
    
    // Also close on backdrop click
    document.getElementById('paymentModalBackdrop')?.addEventListener('click', (e) => {
        if (e.target.id === 'paymentModalBackdrop') {
            closePaymentModal();
        }
    });
});