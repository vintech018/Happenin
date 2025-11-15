import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const categories = ['All', 'Concert', 'Comedy', 'Stand-up'];

export default function LiveEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await api.getLiveEvents();
        setEvents(data);
        setFilteredEvents(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data from JSON server:', error);
        setError('Error loading events. Please ensure the JSON server is running. Try running: json-server --watch db.json');
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category === selectedCategory));
    }
  }, [selectedCategory, events]);

  const formatCurrency = (amount) => {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  };

  return (
    <main className="container">
      <section className="list-page">
        <h1>Live Events</h1>

        <div className="category-nav" id="categoryNav">
          {categories.map(category => (
            <button
              key={category}
              className={`category-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              data-category={category}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="loading-text">Loading events...</p>
        ) : error ? (
          <p className="loading-text" style={{ color: 'var(--primary-dark)' }}>
            ❌ {error}
          </p>
        ) : filteredEvents.length === 0 ? (
          <p className="loading-text">No events found for this category. Try selecting 'All'.</p>
        ) : (
          <div className="grid" id="liveEventGrid">
            {filteredEvents.map(event => (
              <article key={event.id} className="tile">
                <Link to={`/live-events/${event.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="thumb">
                    <img src={`/${event.image}`} alt={event.title} />
                    <span className="date-badge">{event.date}</span>
                    <span className="category-badge">{event.category}</span>
                  </div>
                  <h4>{event.title}</h4>
                  <p className="muted">{event.location}</p>
                </Link>
                <div className="price-row">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span className="price">{formatCurrency(event.price)} onwards</span>
                    {event.discount && <span className="discount" style={{ fontSize: '0.8rem' }}>{event.discount}</span>}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/live-events/${event.id}`);
                    }} 
                    className="btn"
                    style={{
                      display: 'block',
                      visibility: 'visible',
                      opacity: 1,
                      background: '#5928E5',
                      color: '#F1F1F1',
                      padding: '0.5rem 1.25rem',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      minWidth: '90px',
                      minHeight: '38px',
                      zIndex: 10,
                      flexShrink: 0
                    }}
                  >
                    Book now
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
