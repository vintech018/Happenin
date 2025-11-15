import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      try {
        const data = await api.getMovie(id);
        setMovie(data);
        if (data.showtimes && data.showtimes.length > 0) {
          setSelectedShowtime(data.showtimes[0]);
        }
      } catch (error) {
        console.error('Error loading movie:', error);
      } finally {
        setLoading(false);
      }
    }
    loadMovie();
  }, [id]);

  const handleBookNow = () => {
    if (!selectedShowtime) return;
    navigate(`/movies/${id}/book`, { state: { movie, showtime: selectedShowtime } });
  };

  if (loading) return <div className="container"><p className="loading-text">Loading...</p></div>;
  if (!movie) return <div className="container"><p className="loading-text">Movie not found</p></div>;

  return (
    <main className="container">
      <section className="list-page">
        <button onClick={() => navigate(-1)} className="btn" style={{ marginBottom: '1rem' }}>
          ← Back
        </button>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
          <div style={{ flex: '0 0 300px' }}>
            <img src={`/${movie.poster}`} alt={movie.title} style={{ width: '100%', borderRadius: '8px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <h1>{movie.title}</h1>
            <p className="muted">{movie.year} • {movie.genre} • IMDb {movie.rating}</p>
            <p style={{ marginTop: '1rem' }}>Price: ₹{movie.price}</p>
            
            <div style={{ marginTop: '2rem' }}>
              <h3>Select Showtime</h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                {movie.showtimes && movie.showtimes.map((time, idx) => (
                  <button
                    key={idx}
                    className={`btn ${selectedShowtime === time ? '' : 'btn-ghost'}`}
                    onClick={() => setSelectedShowtime(time)}
                    style={{ 
                      background: selectedShowtime === time ? 'var(--primary)' : 'transparent',
                      color: selectedShowtime === time ? 'white' : 'var(--primary)',
                      border: '1px solid var(--primary)'
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="btn" 
              onClick={handleBookNow}
              disabled={!selectedShowtime}
              style={{ marginTop: '2rem', width: '200px' }}
            >
              Book Tickets
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

