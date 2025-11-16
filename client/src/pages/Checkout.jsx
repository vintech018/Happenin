import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import PaymentModal from '../components/PaymentModal';
import { sendTicketEmail } from '../utils/sendTicketEmail';

const UPI_ID = "*****8456@upi";

export default function Checkout() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [formData, setFormData] = useState({
    name: 'Happenin User',
    email: 'user@example.com',
    phone: ''
  });
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('happeninBookingData');
    if (!data) {
      navigate('/movies');
      return;
    }
    setBookingData(JSON.parse(data));
  }, [navigate]);

  // Check for coupon in URL
  useEffect(() => {
    if (!bookingData) return;
    const params = new URLSearchParams(window.location.search);
    const urlCoupon = params.get('coupon');
    if (urlCoupon) {
      setCoupon(urlCoupon);
      // Apply coupon directly here to avoid dependency issues
      const couponCode = urlCoupon.trim().toUpperCase();
      let newDiscount = 0;
      let message = '';
      let type = 'error';

      if (couponCode === 'HAPPENIN20') {
        newDiscount = Math.round(bookingData.rawSubtotal * 0.20);
        message = `Coupon "${couponCode}" applied successfully! You saved ${formatCurrency(newDiscount)}.`;
        type = 'info';
        toast.success(message);
      } else if (couponCode === 'FREESTUFF') {
        newDiscount = 500;
        message = `Coupon "${couponCode}" applied successfully! You saved ${formatCurrency(newDiscount)}.`;
        type = 'info';
        toast.success(message);
      } else if (couponCode === 'NEWUSER') {
        newDiscount = 150;
        message = `Coupon "${couponCode}" applied successfully! You saved ${formatCurrency(newDiscount)}.`;
        type = 'info';
        toast.success(message);
      } else if (couponCode === 'WEEKEND50') {
        newDiscount = 200;
        message = `Coupon "${couponCode}" applied successfully! You saved ${formatCurrency(newDiscount)}.`;
        type = 'info';
        toast.success(message);
      } else {
        message = 'Invalid coupon code. Please try again.';
        toast.error(message);
      }

      if (newDiscount > 0) {
        setDiscount(newDiscount);
        setStatusMessage({ text: message, type });
      }
    }
  }, [bookingData]);

  const formatCurrency = (amount) => {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  };

  const applyCoupon = (code) => {
    if (!code || !bookingData) return;

    const couponCode = code.trim().toUpperCase();
    let newDiscount = 0;
    let message = '';
    let type = 'error';

    // Coupon Validation and Discount Calculation (matching original checkout.js)
    if (couponCode === 'HAPPENIN20') {
      newDiscount = Math.round(bookingData.rawSubtotal * 0.20);
      message = `Coupon "${couponCode}" applied successfully! You saved ${formatCurrency(newDiscount)}.`;
      type = 'info';
      toast.success(message);
    } else if (couponCode === 'FREESTUFF') {
      newDiscount = 500;
      message = `Coupon "${couponCode}" applied successfully! You saved ${formatCurrency(newDiscount)}.`;
      type = 'info';
      toast.success(message);
    } else if (couponCode === 'NEWUSER') {
      newDiscount = 150;
      message = `Coupon "${couponCode}" applied successfully! You saved ${formatCurrency(newDiscount)}.`;
      type = 'info';
      toast.success(message);
    } else if (couponCode === 'WEEKEND50') {
      newDiscount = 200;
      message = `Coupon "${couponCode}" applied successfully! You saved ${formatCurrency(newDiscount)}.`;
      type = 'info';
      toast.success(message);
    } else {
      if (code) {
        message = 'Invalid coupon code. Please try again.';
        toast.error(message);
      }
      return;
    }

    setDiscount(newDiscount);
    setStatusMessage({ text: message, type });
  };

  const handleCouponApply = () => {
    applyCoupon(coupon);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setStatusMessage({ text: 'Please fill in your Name and Email to proceed.', type: 'error' });
      return;
    }

    if (finalAmount <= 0) {
      setStatusMessage({ 
        text: 'Payment successful! Total amount was ₹0. Booking Confirmed.', 
        type: 'success' 
      });
      return;
    }

    // Store user name for personalized modal confirmation
    localStorage.setItem('checkoutUserName', formData.name);
    
    // Show payment modal
    setShowPaymentModal(true);
  };

  const handlePaymentModalClose = () => {
    setShowPaymentModal(false);
  };

  const handlePaymentSuccess = async () => {
    const userName = localStorage.getItem('checkoutUserName') || 'Happenin User';
    const finalAmountText = formatCurrency(finalAmount);
    
    setIsPaymentConfirmed(true);
    setStatusMessage({ 
      text: `✅ Success, ${userName}! Your payment of ${finalAmountText} is confirmed. Processing your ticket...`, 
      type: 'success' 
    });

    // Store booking confirmation
    const finalBooking = {
      ...bookingData,
      customer: formData,
      discount,
      finalAmount: finalAmount,
      status: 'confirmed',
      bookingDate: new Date().toISOString()
    };

    localStorage.setItem('bookingConfirmation', JSON.stringify(finalBooking));
    localStorage.removeItem('happeninBookingData');
    
    // Extract booking details for email
    try {
      setIsSendingEmail(true);
      
      // Parse eventDate to extract date and time
      const eventDateParts = bookingData.eventDate ? bookingData.eventDate.split(', ') : ['', ''];
      const bookingDate = eventDateParts[0] || 'N/A';
      const bookingTime = eventDateParts[1] || 'N/A';
      
      // Extract seats from selectedTickets
      let seats = 'N/A';
      if (bookingData.selectedTickets && bookingData.selectedTickets.length > 0) {
        const seatInfo = bookingData.selectedTickets[0].category;
        // Check if seats are in the format "Selected Seats (A1, B2, C3)"
        const seatMatch = seatInfo.match(/Selected Seats \((.+)\)/);
        if (seatMatch) {
          seats = seatMatch[1];
        } else {
          seats = seatInfo;
        }
      }
      
      // Send ticket email with QR code
      await sendTicketEmail({
        name: formData.name,
        email: formData.email,
        movie: bookingData.eventName || 'Event',
        date: bookingDate,
        time: bookingTime,
        seats: seats,
        ticketId: crypto.randomUUID()
      });
      
      setIsSendingEmail(false);
      setStatusMessage({ 
        text: `✅ Success, ${userName}! Your payment of ${finalAmountText} is confirmed. Your ticket has been emailed with a QR code 🎉`, 
        type: 'success' 
      });
      toast.success('Your ticket has been emailed with a QR code 🎉');
      
    } catch (error) {
      console.error('Failed to send ticket email:', error);
      setIsSendingEmail(false);
      // Still show success for payment, but note email issue
      setStatusMessage({ 
        text: `✅ Success, ${userName}! Your payment of ${finalAmountText} is confirmed. Note: Email delivery failed - please contact support.`, 
        type: 'success' 
      });
      toast.error('Payment confirmed, but email delivery failed. Please contact support.');
    }
    
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (!bookingData) return null;

  const finalAmount = Math.max(0, bookingData.rawTotal - discount);

  return (
    <main className="container checkout-page-container">
      <Toaster />
      <h1><i className="fas fa-lock"></i> Secure Checkout</h1>
      
      <div className="checkout-grid">
        <section className="checkout-form-column">
          <h2>Confirm Details</h2>
          
          {statusMessage.text && (
            <div className={`status-message ${statusMessage.type}`} id="payment-status-message">
              {statusMessage.text}
              {isSendingEmail && (
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Sending your ticket email...</span>
                </div>
              )}
            </div>
          )}
          
          <form id="payment-form" className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Booking Name</label>
              <input 
                type="text" 
                id="name" 
                required 
                placeholder="Jane Doe" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="email">Email Address (for E-Ticket)</label>
              <input 
                type="email" 
                id="email" 
                required 
                placeholder="your.email@example.com" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="coupon">Coupon Code (Optional)</label>
              <input 
                type="text" 
                id="coupon" 
                placeholder="HAPPENIN20" 
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button 
                type="button" 
                className="btn btn-ghost" 
                id="applyCouponBtn"
                onClick={handleCouponApply}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(calc(-50% + 15px))', padding: '6px 15px', fontSize: '0.9rem' }}
              >
                Apply
              </button>
            </div>

            <p className="terms-text">By clicking 'Proceed to Pay', you agree to the <a href="#">Terms and Conditions</a> and <a href="#">Cancellation Policy</a>.</p>
            
            <button 
              id="pay-now-button" 
              className="btn login-btn pay-btn" 
              type="submit"
              disabled={isPaymentConfirmed || !bookingData}
            >
              {isPaymentConfirmed ? (
                <>
                  <i className="fas fa-check"></i> BOOKING CONFIRMED
                </>
              ) : (
                <>
                  <i className="fas fa-arrow-right"></i> Proceed to Pay ₹{formatCurrency(finalAmount)}
                </>
              )}
            </button>
          </form>
        </section>
        
        <aside className="order-summary-column">
          <h2>Order Summary</h2>
          
          <div className="summary-details">
            <p className="event-title">
              <i className="fas fa-ticket-alt"></i> <span id="summary-event-name">{bookingData.eventName}</span>
            </p>
            <p className="event-meta" id="summary-ticket-details">
              {bookingData.eventDate}
              {bookingData.selectedTickets && bookingData.selectedTickets.map((ticket, idx) => (
                <span key={idx}><br />{ticket.category} x {ticket.quantity}</span>
              ))}
            </p>
          </div>
          
          <div className="price-breakdown">
            <p><span>Tickets Subtotal:</span> <span id="summary-subtotal-price">{formatCurrency(bookingData.rawSubtotal)}</span></p>
            <p><span>Convenience Fees:</span> <span id="summary-fees-price">{formatCurrency(bookingData.rawFees)}</span></p>
            {discount > 0 && (
              <p className="discount-row">
                <span>Discount Applied:</span> 
                <span id="summary-discount" className="discount-value">- {formatCurrency(discount)}</span>
              </p>
            )}
            <p className="total-row">
              <span>Total Payable:</span> 
              <span id="summary-total">{formatCurrency(finalAmount)}</span>
            </p>
          </div>
          
          <div className="booking-guarantee">
            <i className="fas fa-shield-alt"></i>
            <p>Your tickets are reserved temporarily. Payment must be completed now.</p>
          </div>
        </aside>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={handlePaymentModalClose}
        finalAmount={finalAmount}
        upiId={UPI_ID}
        userName={formData.name}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </main>
  );
}
