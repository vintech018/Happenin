import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const categories = ['All', 'Concert', 'Comedy', 'Stand-up'];

export default function LiveEvents() {
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
              <Link key={event.id} to={`/live-events/${event.id}`} className="tile-link">
                <article className="tile">
                  <div className="thumb">
                    <img src={`/${event.image}`} alt={event.title} />
                    <span className="date-badge">{event.date}</span>
                    <span className="category-badge">{event.category}</span>
                  </div>
                  <h4>{event.title}</h4>
                  <p className="muted">{event.location}</p>
                  <div className="price-row">
                    <span className="price">{formatCurrency(event.price)} onwards</span>
                    <span className="discount">{event.discount}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
