import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { getLiveEventById } from '../data/liveEvents';

export default function LiveEventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await api.getLiveEvent(id);
        setEvent(data);
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

  if (loading) return <div className="container"><p className="loading-text">Loading...</p></div>;
  if (!event) return <div className="container"><p className="loading-text">Event not found</p></div>;

  const staticData = getLiveEventById(parseInt(id));

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
            <h1>{event.title}</h1>
            <p className="meta">
              <i className="fas fa-calendar-alt"></i> {event.date} &nbsp; • &nbsp;
              <i className="fas fa-map-marker-alt"></i> {event.location} &nbsp; • &nbsp;
              <span className="price">₹{event.price} onwards</span>
            </p>
          </div>
        </div>
      </div>

      <main className="container booking-container">
        <section className="details-column">
          <h2>Event Overview</h2>
          <p dangerouslySetInnerHTML={{ __html: (staticData?.overview || `Experience ${event.title} live at ${event.location}. Don't miss this amazing ${event.category.toLowerCase()} event!`).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

          {staticData?.importantInfo && (
            <div className="about-section">
              <h3><i className="fas fa-info-circle"></i> Important Information</h3>
              <ul className="feature-list">
                {staticData.importantInfo.map((info, idx) => (
                  <li key={idx}><i className="fas fa-check-circle"></i> {info}</li>
                ))}
              </ul>
            </div>
          )}

          {staticData?.seatMapImage && (
            <div className="about-section">
              <h3><i className="fas fa-map"></i> Venue Seat Map</h3>
              <div className="seat-map-placeholder">
                <img 
                  src={`/${staticData.seatMapImage}`} 
                  alt="Venue Seating Map" 
                  className="stadium-map-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<p style="padding: 2rem; color: #666;">Seating map image not available</p>';
                  }}
                />
              </div>
              {staticData.seatMapText && (
                <p className="muted" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                  {staticData.seatMapText}
                </p>
              )}
            </div>
          )}

          {staticData?.locationLink && (
            <div className="about-section">
              <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                <a 
                  href={staticData.locationLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="map-link"
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    color: 'var(--primary)',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  <i className="fas fa-map-marker-alt"></i> View on Google Maps
                </a>
              </p>
            </div>
          )}
        </section>

        <aside className="booking-column">
          <h3>Book Your Tickets</h3>
          <p>Select your preferred date, time, and ticket category.</p>
          <Link to={`/live-events/${id}/book`} className="btn checkout-btn">
            <i className="fas fa-ticket-alt"></i> Select Tickets
          </Link>
          <p className="muted" style={{ textAlign: 'center', marginTop: '1rem' }}>
            Tickets start from ₹{event.price} onwards.
          </p>
        </aside>
      </main>
    </>
  );
}

