import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { getLiveEventById } from '../data/liveEvents';

const TAX_RATE = 0.10;

export default function LiveEventBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [ticketQuantities, setTicketQuantities] = useState({});
  const [totalTickets, setTotalTickets] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [staticData, setStaticData] = useState(null);

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await api.getLiveEvent(id);
        setEvent(data);
        const staticEventData = getLiveEventById(parseInt(id));
        setStaticData(staticEventData);
        if (staticEventData && staticEventData.dates && staticEventData.dates.length > 0) {
          setSelectedDate(staticEventData.dates[0]);
        } else {
          setSelectedDate(data.date);
        }
      } catch (error) {
        console.error('Error loading event:', error);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadEvent();
    }
  }, [id]);

  const ticketCategories = staticData?.ticketCategories || [
    { category: 'Reserved Seating', price: 799 },
    { category: 'General Admission', price: 499 },
    { category: 'Standing/Entry', price: 299 }
  ];

  const calculateTotal = () => {
    let tickets = 0;
    let total = 0;

    ticketCategories.forEach((ticket, idx) => {
      const qty = ticketQuantities[idx] || 0;
      tickets += qty;
      total += qty * ticket.price;
    });

    setTotalTickets(tickets);
    setSubtotal(total);
  };

  // Recalculate totals whenever ticketQuantities changes
  useEffect(() => {
    calculateTotal();
  }, [ticketQuantities]);

  const handleQuantityChange = (idx, value) => {
    const qty = Math.max(0, parseInt(value) || 0);
    setTicketQuantities(prev => ({ ...prev, [idx]: qty }));
  };

  const formatCurrency = (amount) => {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  };

  const handleCheckout = () => {
    if (totalTickets === 0) {
      alert("Please select at least one ticket.");
      return;
    }

    if (!selectedDate) {
      alert("Please select a date/time to continue.");
      return;
    }

    const selectedTickets = ticketCategories
      .map((ticket, idx) => ({
        category: ticket.category,
        price: ticket.price,
        quantity: ticketQuantities[idx] || 0
      }))
      .filter(t => t.quantity > 0);

    const fees = subtotal * TAX_RATE;
    const total = subtotal + fees;

    const bookingData = {
      eventName: event.title,
      eventDate: selectedDate,
      rawSubtotal: subtotal,
      rawFees: fees,
      rawTotal: total,
      totalTickets: totalTickets,
      selectedTickets: selectedTickets
    };

    localStorage.setItem('happeninBookingData', JSON.stringify(bookingData));
    navigate('/checkout');
  };

  if (loading) return <div className="container"><p className="loading-text">Loading...</p></div>;
  if (!event) return <div className="container"><p className="loading-text">Event not found</p></div>;

  const fees = subtotal * TAX_RATE;
  const total = subtotal + fees;

  return (
    <>
      <div className="event-header">
        <img 
          src={`/${event.image}`} 
          alt={`${event.title} Banner`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="event-overlay">
          <div className="container">
            <h1>{event.title} — Booking</h1>
            <p className="meta">
              <i className="fas fa-map-marker-alt"></i> {event.location}
            </p>
          </div>
        </div>
      </div>

      <main className="container booking-container">
        <section className="details-column">
          <h2>Event Overview</h2>
          <p>Book your tickets for {event.title} at {event.location}.</p>

          {staticData?.dates && staticData.dates.length > 0 && (
            <div className="about-section" style={{ borderTop: 'none' }}>
              <h3><i className="fas fa-calendar-day"></i> Select Date & Time</h3>
              <div className="select-show-time">
                {staticData.dates.map((dateOption, idx) => (
                  <div
                    key={idx}
                    className={`time-slot ${selectedDate === dateOption ? 'selected' : ''}`}
                    onClick={() => setSelectedDate(dateOption)}
                    data-time={dateOption}
                  >
                    {dateOption}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <aside className="booking-column">
          <h3>Book Your Tickets</h3>
          
          <div className="selection-group">
            <label>Select Category & Quantity</label>
            <div className="ticket-selection">
              {ticketCategories.map((ticket, idx) => (
                <div key={idx} className="ticket-row" data-category={ticket.category} data-price={ticket.price}>
                  <div className="ticket-info">
                    <span className="ticket-category">{ticket.category}</span>
                    <span className="ticket-price">{formatCurrency(ticket.price)}</span>
                  </div>
                  <div className="ticket-quantity-controls">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(idx, (ticketQuantities[idx] || 0) - 1)}
                      className="quantity-btn"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      className="ticket-quantity"
                      min="0"
                      max="10"
                      value={ticketQuantities[idx] || 0}
                      onChange={(e) => handleQuantityChange(idx, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(idx, (ticketQuantities[idx] || 0) + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="booking-summary" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
            <div className="summary-row">
              <span>Total Tickets:</span>
              <span id="totalTickets">{totalTickets}</span>
            </div>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span id="subTotal">{formatCurrency(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Taxes & Fees (10%):</span>
              <span id="fees">{formatCurrency(fees)}</span>
            </div>
            <div className="summary-row" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '2px solid var(--border-light)' }}>
              <span>Total Payable:</span>
              <span id="totalPrice">{formatCurrency(total)}</span>
            </div>
          </div>

          <button
            className="btn checkout-btn"
            onClick={handleCheckout}
            disabled={totalTickets === 0}
            style={{ width: '100%', marginTop: '1.5rem', opacity: totalTickets === 0 ? 0.6 : 1 }}
          >
            <i className="fas fa-credit-card"></i> Proceed to Checkout
          </button>
        </aside>
      </main>
    </>
  );
}

