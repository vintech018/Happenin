import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getMovieBySlug } from '../data/movies';

const TAX_RATE = 0.10;

export default function MovieShowtimes() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [movieSlug, setMovieSlug] = useState(slug);
  
  useEffect(() => {
    // Handle legacy routes (e.g., /deadpool-showtimes -> deadpool slug)
    let resolvedSlug = slug;
    if (!slug) {
      resolvedSlug = location.pathname.replace('/', '').replace('-showtimes', '').replace('.html', '');
    }
    setMovieSlug(resolvedSlug);
    const movieData = getMovieBySlug(resolvedSlug);
    setMovie(movieData);
  }, [slug, location.pathname]);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('2D');
  const [ticketQuantities, setTicketQuantities] = useState({});
  const [totalTickets, setTotalTickets] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (movie?.dates && movie.dates.length > 0) {
      setSelectedDate(movie.dates[0]);
    }
  }, [movie]);

  const formatCurrency = (amount) => {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  };

  const calculateTotal = () => {
    if (!movie) return;
    
    let tickets = 0;
    let total = 0;

    movie.ticketPrices.forEach((ticket, idx) => {
      const qty = ticketQuantities[idx] || 0;
      tickets += qty;
      total += qty * ticket.price;
    });

    setTotalTickets(tickets);
    setSubtotal(total);
  };

  // Recalculate totals whenever ticketQuantities changes
  useEffect(() => {
    if (movie) {
      calculateTotal();
    }
  }, [ticketQuantities, movie]);

  if (!movie) {
    return (
      <div className="container">
        <p className="loading-text">Movie not found</p>
        <button onClick={() => navigate(-1)} className="btn">Back</button>
      </div>
    );
  }

  const handleQuantityChange = (idx, value) => {
    const qty = Math.max(0, parseInt(value) || 0);
    setTicketQuantities(prev => ({ ...prev, [idx]: qty }));
  };

  const handleProceed = () => {
    if (totalTickets === 0) {
      alert("Please select at least one ticket.");
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("Please select both a Date and a Showtime to continue.");
      return;
    }

    const selectedTickets = movie.ticketPrices
      .map((ticket, idx) => ({
        category: ticket.category,
        price: ticket.price,
        quantity: ticketQuantities[idx] || 0
      }))
      .filter(t => t.quantity > 0);

    const bookingData = {
      eventName: `${movie.title} (${movie.venue})`,
      eventDate: selectedDate,
      showTime: selectedTime,
      tickets: totalTickets,
      subtotal: subtotal,
      selectedTickets: selectedTickets
    };

    localStorage.setItem(`${movieSlug}BookingInfo`, JSON.stringify(bookingData));
    navigate(`/movies/${movieSlug}/seats`);
  };

  const fees = subtotal * TAX_RATE;
  const total = subtotal + fees;

  return (
    <>
      <div className="event-header" style={{ height: '300px' }}>
        <img 
          src={`/${movie.poster}`} 
          alt={`${movie.title} Poster`}
          style={{ 
            objectFit: 'cover', 
            filter: 'brightness(0.6)', 
            width: '100%', 
            height: '100%',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
        <div className="event-overlay">
          <div className="container">
            <h1>{movie.title} — Showtimes</h1>
            <p className="meta">
              <i className="fas fa-map-marker-alt"></i> {movie.venue}
            </p>
          </div>
        </div>
      </div>

      <main className="container booking-container">
        <section className="details-column">
          <h2>Select Your Show</h2>
          <p>Choose a convenient date, time, and ticket class before proceeding to seat selection.</p>

          <div className="about-section" style={{ borderTop: 'none' }}>
            <h3><i className="fas fa-calendar-day"></i> Select Date</h3>
            <div className="select-show-time">
              {movie.dates.map((date, idx) => (
                <div
                  key={idx}
                  className={`time-slot ${selectedDate === date ? 'selected' : ''}`}
                  onClick={() => setSelectedDate(date)}
                  data-time={date}
                >
                  {idx === 0 ? 'Today, ' : idx === 1 ? 'Sat, ' : 'Sun, '}{date}
                </div>
              ))}
            </div>
          </div>

          {movie.showtimes2D.length > 0 && (
            <div className="about-section">
              <h3><i className="fas fa-clock"></i> Select Showtime (2D English)</h3>
              <div className="select-show-time">
                {movie.showtimes2D.map((time, idx) => (
                  <div
                    key={idx}
                    className={`time-slot ${selectedTime === time && selectedFormat === '2D' ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedTime(time);
                      setSelectedFormat('2D');
                    }}
                    data-time={time}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
          )}

          {movie.showtimesIMAX.length > 0 && (
            <div className="about-section">
              <h3><i className="fas fa-clock"></i> Select Showtime (IMAX 3D)</h3>
              <div className="select-show-time">
                {movie.showtimesIMAX.map((time, idx) => (
                  <div
                    key={idx}
                    className={`time-slot ${selectedTime === time && selectedFormat === 'IMAX' ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedTime(time);
                      setSelectedFormat('IMAX');
                    }}
                    data-time={time}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <aside className="booking-column">
          <h3>Ticket Class Pricing</h3>
          
          <div className="ticket-selection">
            {movie.ticketPrices.map((ticket, idx) => (
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

          <div className="booking-summary">
            <div className="summary-row">
              <span>Total Tickets:</span>
              <span id="totalTickets">{totalTickets}</span>
            </div>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span id="subTotal">{formatCurrency(subtotal)}</span>
            </div>
          </div>

          <button
            id="selectSeatsBtn"
            className="btn checkout-btn"
            onClick={handleProceed}
            disabled={totalTickets === 0}
            style={{ width: '100%', marginTop: '1rem', opacity: totalTickets === 0 ? 0.6 : 1 }}
          >
            <i className="fas fa-chair"></i> Proceed to Select Seats
          </button>
        </aside>
      </main>
    </>
  );
}

