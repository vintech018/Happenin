// offers.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Initialize Footer Year ---
    const yearElement = document.getElementById('year-offers');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // --- Tab Switching Logic ---
    const tabItems = document.querySelectorAll('.tab-item');
    const tabContents = document.querySelectorAll('.tab-content');

    tabItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetTab = this.dataset.tab;

            // Remove active class from all tabs and content
            tabItems.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and its content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // --- Coupon Copy to Clipboard Logic (for buttons with data-coupon-text) ---
    const couponButtons = document.querySelectorAll('.offer-btn[data-coupon-text]');
    
    couponButtons.forEach(button => {
        button.addEventListener('click', function() {
            const code = this.dataset.code;
            
            // Use Clipboard API for modern browsers
            if (navigator.clipboard) {
                navigator.clipboard.writeText(code).then(() => {
                    // Temporarily change button text for user feedback
                    const originalText = this.textContent;
                    this.textContent = 'COPIED!';
                    this.classList.add('btn-ghost');
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.classList.remove('btn-ghost');
                    }, 1500);
                }).catch(err => {
                    console.error('Could not copy text: ', err);
                });
            } else {
                // Fallback for older browsers (less reliable)
                alert("Coupon code copied: " + code);
            }
        });
    });
    
    // --- General Scroll to Top Functionality (Copied from styles.js pattern) ---
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            scrollToTopBtn.classList.toggle('show', window.pageYOffset > 300);
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});