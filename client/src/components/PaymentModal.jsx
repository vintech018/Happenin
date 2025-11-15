import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentModal({ isOpen, onClose, finalAmount, upiId, userName, onPaymentSuccess }) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isProcessing) {
      const formattedAmount = Math.round(finalAmount).toLocaleString('en-IN');
      setButtonText(`I have paid ₹${formattedAmount}`);
    }
  }, [finalAmount, isProcessing]);

  const handleConfirmation = () => {
    setIsProcessing(true);
    setButtonText('Verifying Payment... (Simulated)');

    setTimeout(() => {
      onClose();
      setIsProcessing(false);
      
      // Trigger success callback
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
      
      // Redirect after a delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 2000);
  };

  if (!isOpen) return null;

  const formattedAmount = Math.round(finalAmount).toLocaleString('en-IN');

  return (
    <div className="modal-backdrop show" id="paymentModalBackdrop" onClick={(e) => {
      if (e.target.id === 'paymentModalBackdrop') {
        onClose();
      }
    }}>
      <div className="payment-modal-content">
        <div className="modal-header">
          <h3>Complete Your Payment</h3>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-payment-info">
          <p className="amount-display">
            <span style={{ fontSize: '1rem' }}>Total Payable</span>
            <span id="modalFinalAmount">₹{formattedAmount}</span>
          </p>

          <div className="upi-qr-box">
            <img src="/images/upi.jpg" alt="UPI QR Code" className="upi-qr-image-modal" onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<p style="padding: 2rem; color: #666;">UPI QR Code</p>';
            }} />
            <p className="upi-id-text-modal" id="modalUpiIdText">UPI ID: {upiId}</p>
          </div>
          
          <p className="upi-instructions-modal">
            **Instructions:**<br />
            1. Open any UPI App (GPay, PhonePe, Paytm, etc.).<br />
            2. Scan the QR code above or manually enter the UPI ID.<br />
            3. Send the <b>exact amount</b> shown above.<br />
            4. <b>CRITICAL:</b> Only click the button below *after* the transaction is successful in your UPI app.
          </p>

          <button 
            className="modal-confirmation-btn" 
            onClick={handleConfirmation}
            disabled={isProcessing}
            style={{ backgroundColor: isProcessing ? '#ffc107' : '#28a745' }}
          >
            {buttonText || `I have paid ₹${Math.round(finalAmount).toLocaleString('en-IN')}`}
          </button>
          <p className="modal-warning-text">
            *Booking is confirmed based on your assertion. Non-payment will lead to cancellation.*
          </p>
        </div>
      </div>
    </div>
  );
}

