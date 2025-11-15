import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getMovieBySlug } from '../data/movies';

const TAX_RATE = 0.10;
const SEAT_ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const SEATS_PER_ROW = 10;

export default function MovieSeats() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [movieSlug, setMovieSlug] = useState(slug);
  
  useEffect(() => {
    // Handle legacy routes (e.g., /deadpool-seats -> deadpool slug)
    let resolvedSlug = slug;
    if (!slug) {
      resolvedSlug = location.pathname.replace('/', '').replace('-seats', '').replace('.html', '');
    }
    setMovieSlug(resolvedSlug);
    const movieData = getMovieBySlug(resolvedSlug);
    setMovie(movieData);
  }, [slug, location.pathname]);

  const [bookingInfo, setBookingInfo] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [totalTicketsRequired, setTotalTicketsRequired] = useState(0);
  const [occupiedSeats, setOccupiedSeats] = useState(['A10', 'B9', 'C8', 'D7', 'E6']);

  useEffect(() => {
    if (movie?.occupiedSeats) {
      setOccupiedSeats(movie.occupiedSeats);
    }
  }, [movie]);

  useEffect(() => {
    if (!movieSlug) return;
    
    const dataString = localStorage.getItem(`${movieSlug}BookingInfo`);
    if (dataString) {
      try {
        const loadedData = JSON.parse(dataString);
        setBookingInfo(loadedData);
        setTotalTicketsRequired(loadedData.tickets || 0);
      } catch (e) {
        console.error("Error parsing booking data:", e);
        navigate(`/movies/${movieSlug}/showtimes`);
      }
    } else {
      navigate(`/movies/${movieSlug}/showtimes`);
    }
  }, [movieSlug, navigate]);

  const formatCurrency = (amount) => {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  };

  const toggleSeat = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;

    const newSelected = new Set(selectedSeats);
    if (newSelected.has(seatId)) {
      newSelected.delete(seatId);
    } else {
      if (newSelected.size < totalTicketsRequired) {
        newSelected.add(seatId);
      } else {
        alert(`You can only select ${totalTicketsRequired} seat(s).`);
        return;
      }
    }
    setSelectedSeats(newSelected);
  };

  const handleCheckout = () => {
    if (selectedSeats.size !== totalTicketsRequired) {
      alert(`Please select exactly ${totalTicketsRequired} seat(s).`);
      return;
    }

    const sortedSeats = Array.from(selectedSeats).sort();
    const subtotal = bookingInfo.subtotal;
    const fees = subtotal * TAX_RATE;
    const total = subtotal + fees;

    const finalBookingData = {
      eventName: bookingInfo.eventName,
      eventDate: `${bookingInfo.eventDate}, ${bookingInfo.showTime}`,
      selectedTickets: [{
        category: `Selected Seats (${sortedSeats.join(', ')})`,
        price: subtotal,
        quantity: 1
      }],
      rawSubtotal: subtotal,
      rawFees: fees,
      rawTotal: total,
      totalTickets: selectedSeats.size
    };

    localStorage.setItem('happeninBookingData', JSON.stringify(finalBookingData));
    localStorage.removeItem(`${movieSlug}BookingInfo`);
    navigate('/checkout');
  };

  if (!movie || !bookingInfo) {
    return <div className="container"><p className="loading-text">Loading...</p></div>;
  }

  const subtotal = bookingInfo.subtotal;
  const fees = subtotal * TAX_RATE;
  const total = subtotal + fees;
  const isReady = selectedSeats.size === totalTicketsRequired && totalTicketsRequired > 0;
  const sortedSeats = Array.from(selectedSeats).sort();

  return (
    <>
      <div className="event-header" style={{ height: '300px' }}>
        <img 
          src={`/${movie.poster}`} 
          alt={`${movie.title} Poster`}
          style={{ objectFit: 'cover', filter: 'brightness(0.6)', width: '100%', height: '100%' }}
        />
        <div className="event-overlay">
          <div className="container">
            <h1>Select Your Seats</h1>
            <p className="meta" id="movie-meta">
              <i className="fas fa-calendar-alt"></i> {bookingInfo.eventDate}, {bookingInfo.showTime}
            </p>
          </div>
        </div>
      </div>

      <main className="container booking-container">
        <section className="details-column">
          <h2>Seat Selection</h2>
          <p>Select {totalTicketsRequired} seat(s) for your booking.</p>

          <div className="seat-map-section">
            <div className="seat-map-container" id="seatMap">
              {SEAT_ROWS.map((rowLetter) => (
                <div key={rowLetter} className="seat-row" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  justifyContent: 'center'
                }}>
                  <span className="row-label" style={{
                    width: '30px',
                    fontWeight: 600,
                    textAlign: 'center'
                  }}>{rowLetter}</span>
                  {Array.from({ length: SEATS_PER_ROW }, (_, i) => {
                    const seatId = `${rowLetter}${i + 1}`;
                    const isOccupied = occupiedSeats.includes(seatId);
                    const isSelected = selectedSeats.has(seatId);
                    const isDisabled = !isOccupied && !isSelected && selectedSeats.size >= totalTicketsRequired;

                    return (
                      <span
                        key={seatId}
                        className={`seat ${isOccupied ? 'occupied' : isSelected ? 'selected' : isDisabled ? 'disabled' : 'available'}`}
                        data-seat-id={seatId}
                        onClick={() => !isOccupied && !isDisabled && toggleSeat(seatId)}
                        style={{
                          width: '35px',
                          height: '35px',
                          borderRadius: '4px',
                          border: '1px solid var(--border-light)',
                          background: isOccupied ? '#ccc' : isSelected ? 'var(--primary)' : isDisabled ? '#f0f0f0' : 'white',
                          color: isOccupied ? '#666' : isSelected ? 'white' : 'var(--text-dark)',
                          cursor: isOccupied || isDisabled ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          transition: 'all 0.2s ease',
                          margin: '0 2px'
                        }}
                        title={isOccupied ? 'Occupied' : isSelected ? 'Selected' : seatId}
                      >
                        {i + 1}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex',
              gap: '2rem',
              marginTop: '2rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '20px', height: '20px', background: 'white', border: '1px solid var(--border-light)', borderRadius: '4px' }}></div>
                <span>Available</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '20px', height: '20px', background: 'var(--primary)', borderRadius: '4px' }}></div>
                <span>Selected</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '20px', height: '20px', background: '#ccc', borderRadius: '4px' }}></div>
                <span>Occupied</span>
              </div>
            </div>
          </div>
        </section>

        <aside className="booking-column">
          <h3>Booking Summary</h3>
          
          <div className="booking-summary" style={{ marginTop: '1rem' }}>
            <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Tickets Required:</span>
              <span id="summary-tickets-required">{totalTicketsRequired} tickets</span>
            </div>
            <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Seats Selected:</span>
              <span id="summary-seats-selected">{selectedSeats.size} seats</span>
            </div>
            <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Selected Seats:</span>
              <span id="selectedSeatsList">{sortedSeats.length > 0 ? sortedSeats.join(', ') : 'None'}</span>
            </div>
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
              <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Subtotal:</span>
                <span id="subTotalSummary">{formatCurrency(subtotal)}</span>
              </div>
              <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Fees & Taxes:</span>
                <span id="feesSummary">{formatCurrency(fees)}</span>
              </div>
              <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '2px solid var(--border-light)', fontWeight: 700, fontSize: '1.2rem' }}>
                <span>Total:</span>
                <span id="totalPriceSummary">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          <button
            id="checkoutBtn"
            className="btn checkout-btn"
            onClick={handleCheckout}
            disabled={!isReady}
            style={{ width: '100%', marginTop: '1.5rem', opacity: isReady ? 1 : 0.6 }}
          >
            <i className="fas fa-arrow-right"></i> Proceed to Checkout
          </button>
        </aside>
      </main>
    </>
  );
}

