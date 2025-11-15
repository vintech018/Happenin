import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const TAX_RATE = 0.18;

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, showtime } = location.state || {};
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [ticketCount, setTicketCount] = useState(1);
  const [seatMap, setSeatMap] = useState([]);

  useEffect(() => {
    if (!movie || !showtime) {
      navigate('/movies');
      return;
    }
    generateSeatMap();
  }, [movie, showtime, navigate]);

  const generateSeatMap = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 10;
    const map = [];
    
    for (let row of rows) {
      const rowSeats = [];
      for (let i = 1; i <= seatsPerRow; i++) {
        rowSeats.push(`${row}${i}`);
      }
      map.push(rowSeats);
    }
    setSeatMap(map);
  };

  const toggleSeat = (seat) => {
    const newSelected = new Set(selectedSeats);
    if (newSelected.has(seat)) {
      newSelected.delete(seat);
    } else {
      if (newSelected.size < ticketCount) {
        newSelected.add(seat);
      }
    }
    setSelectedSeats(newSelected);
  };

  const subtotal = selectedSeats.size * (movie?.price || 0);
  const fees = subtotal * TAX_RATE;
  const total = subtotal + fees;

  const handleCheckout = () => {
    if (selectedSeats.size === 0) return;
    
    const bookingData = {
      movie: movie.title,
      showtime,
      seats: Array.from(selectedSeats),
      ticketCount: selectedSeats.size,
      subtotal,
      fees,
      total,
      date: new Date().toISOString()
    };

    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    navigate('/checkout');
  };

  if (!movie) return null;

  return (
    <main className="container">
      <section className="list-page">
        <button onClick={() => navigate(-1)} className="btn" style={{ marginBottom: '1rem' }}>
          ← Back
        </button>
        
        <h1>Select Seats - {movie.title}</h1>
        <p className="muted">Showtime: {showtime}</p>

        <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            Number of Tickets:
          </label>
          <input
            type="number"
            min="1"
            max="8"
            value={ticketCount}
            onChange={(e) => {
              const count = parseInt(e.target.value) || 1;
              setTicketCount(Math.min(8, Math.max(1, count)));
              if (selectedSeats.size > count) {
                const newSelected = new Set(Array.from(selectedSeats).slice(0, count));
                setSelectedSeats(newSelected);
              }
            }}
            style={{
              padding: '0.5rem',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              width: '100px'
            }}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>Screen</h3>
          <div style={{
            background: 'linear-gradient(180deg, rgba(89,40,229,0.1) 0%, rgba(89,40,229,0.05) 100%)',
            padding: '1rem',
            textAlign: 'center',
            borderRadius: '8px',
            marginBottom: '2rem',
            border: '2px solid var(--primary)'
          }}>
            SCREEN THIS WAY
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
            {seatMap.map((row, rowIdx) => (
              <div key={rowIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ width: '30px', fontWeight: 600 }}>{row[0][0]}</span>
                {row.map(seat => {
                  const isSelected = selectedSeats.has(seat);
                  const isDisabled = !isSelected && selectedSeats.size >= ticketCount;
                  return (
                    <button
                      key={seat}
                      onClick={() => !isDisabled && toggleSeat(seat)}
                      disabled={isDisabled}
                      style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '4px',
                        border: '1px solid var(--border-light)',
                        background: isSelected ? 'var(--primary)' : isDisabled ? '#f0f0f0' : 'white',
                        color: isSelected ? 'white' : 'var(--text-dark)',
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        fontWeight: 600,
                        fontSize: '0.8rem'
                      }}
                    >
                      {seat.slice(1)}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: 'var(--background-gray)',
          padding: '1.5rem',
          borderRadius: '8px',
          marginTop: '2rem'
        }}>
          <h3>Booking Summary</h3>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Selected Seats:</span>
              <span>{selectedSeats.size > 0 ? Array.from(selectedSeats).sort().join(', ') : 'None'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Fees & Taxes:</span>
              <span>₹{fees.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid var(--border-light)', fontWeight: 700, fontSize: '1.2rem' }}>
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          <button
            className="btn"
            onClick={handleCheckout}
            disabled={selectedSeats.size === 0}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            Proceed to Checkout
          </button>
        </div>
      </section>
    </main>
  );
}

