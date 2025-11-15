import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Offers() {
  const [activeTab, setActiveTab] = useState('card-offers');

  const handleCopyCode = (code) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        toast.success(`Coupon code "${code}" copied to clipboard!`);
      }).catch(err => {
        console.error('Could not copy text: ', err);
        toast.error('Failed to copy code');
      });
    } else {
      toast.success(`Coupon code: ${code}`);
    }
  };

  return (
    <main className="container list-page">
      <h1>Exclusive Offers & Coupons</h1>

      <div className="offers-tab-nav">
        <button 
          className={`tab-item ${activeTab === 'card-offers' ? 'active' : ''}`}
          onClick={() => setActiveTab('card-offers')}
        >
          <i className="fas fa-credit-card"></i> Card Offers
        </button>
        <button 
          className={`tab-item ${activeTab === 'general-coupons' ? 'active' : ''}`}
          onClick={() => setActiveTab('general-coupons')}
        >
          <i className="fas fa-tags"></i> General Coupons
        </button>
      </div>

      {activeTab === 'card-offers' && (
        <div className="tab-content active" id="card-offers">
          <h2>Bank & Credit Card Promotions</h2>
          <div className="grid offers-grid">
            <article className="offer-tile card-offer">
              <div className="offer-thumb">
                <img src="/images/bank_happenin.jpg" alt="HDFC Bank Offer" onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<i class="fas fa-credit-card"></i>';
                }} />
                <span className="category-badge">VISA / MASTERCARD</span>
              </div>
              <div className="offer-body">
                <h4>HDFC Bank 20% Off</h4>
                <p className="muted">Get 20% off up to ₹500 on all movie and event tickets using HDFC Bank Credit Cards.</p>
                <div className="offer-footer">
                  <span className="expiry-date">
                    <i className="fas fa-clock"></i> Expires: <span className="expiry-span">Oct 31, 2025</span>
                  </span>
                  <button className="btn offer-btn" onClick={() => handleCopyCode('HDFC20')}>
                    Use Code
                  </button>
                </div>
              </div>
            </article>

            <article className="offer-tile card-offer">
              <div className="offer-thumb">
                <img src="/images/icicibank_happenin.png" alt="ICICI Bank Offer" onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<i class="fas fa-credit-card"></i>';
                }} />
                <span className="category-badge">BUY 1 GET 1</span>
              </div>
              <div className="offer-body">
                <h4>ICICI Bank Buy 1 Get 1</h4>
                <p className="muted">Buy one ticket, get the second free (up to ₹250) on ICICI Debit Cards. Valid once per month.</p>
                <div className="offer-footer">
                  <span className="expiry-date">
                    <i className="fas fa-clock"></i> Expires: <span className="expiry-span">Nov 15, 2025</span>
                  </span>
                  <button className="btn offer-btn btn-ghost" onClick={() => handleCopyCode('ICICIBOGO')}>
                    Check Details
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}

      {activeTab === 'general-coupons' && (
        <div className="tab-content active" id="general-coupons">
          <h2>Happenin Promo Codes</h2>
          <div className="grid offers-grid">
            <article className="offer-tile general-coupon">
              <div className="offer-body">
                <div className="coupon-tag">NEWUSER</div>
                <h4>₹150 Flat Discount</h4>
                <p className="muted">For first-time users. Minimum transaction value ₹500. Valid across all events and movies.</p>
                <div className="offer-footer">
                  <span className="expiry-date">
                    <i className="fas fa-clock"></i> Expires: <span className="expiry-span">Dec 31, 2025</span>
                  </span>
                  <button className="btn offer-btn" onClick={() => handleCopyCode('NEWUSER')}>
                    Copy Code
                  </button>
                </div>
              </div>
            </article>
            
            <article className="offer-tile general-coupon">
              <div className="offer-body">
                <div className="coupon-tag">WEEKEND50</div>
                <h4>50% off on Comedy Shows</h4>
                <p className="muted">Max discount ₹200. Only valid for live comedy events on Saturdays and Sundays.</p>
                <div className="offer-footer">
                  <span className="expiry-date">
                    <i className="fas fa-clock"></i> Expires: <span className="expiry-span">Nov 30, 2025</span>
                  </span>
                  <button className="btn offer-btn" onClick={() => handleCopyCode('WEEKEND50')}>
                    Copy Code
                  </button>
                </div>
              </div>
            </article>

            <article className="offer-tile general-coupon">
              <div className="offer-body">
                <div className="coupon-tag">SAVE10</div>
                <h4>10% Off Any Booking</h4>
                <p className="muted">Get 10% discount on any booking. Maximum discount ₹500. Valid for all events.</p>
                <div className="offer-footer">
                  <span className="expiry-date">
                    <i className="fas fa-clock"></i> Expires: <span className="expiry-span">Dec 31, 2025</span>
                  </span>
                  <button className="btn offer-btn" onClick={() => handleCopyCode('SAVE10')}>
                    Copy Code
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}
    </main>
  );
}
