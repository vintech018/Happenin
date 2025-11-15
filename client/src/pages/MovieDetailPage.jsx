import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { getMovieBySlug } from '../data/movies';

export default function MovieDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [movieSlug, setMovieSlug] = useState(slug);
  
  useEffect(() => {
    // Handle legacy routes (e.g., /deadpool -> deadpool slug)
    let resolvedSlug = slug;
    if (!slug && location.pathname !== '/movies') {
      resolvedSlug = location.pathname.replace('/', '').replace('.html', '');
    }
    setMovieSlug(resolvedSlug);
    const movieData = getMovieBySlug(resolvedSlug);
    setMovie(movieData);
  }, [slug, location.pathname]);

  if (!movie) {
    return (
      <div className="container">
        <p className="loading-text">Movie not found</p>
        <Link to="/movies" className="btn">Back to Movies</Link>
      </div>
    );
  }

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
            <h1>{movie.title}</h1>
            <p className="meta">
              <i className="fas fa-calendar-alt"></i> {movie.releaseDate} &nbsp; • &nbsp;
              <i className="fas fa-film"></i> {movie.genre} &nbsp; • &nbsp;
              <span className="price">IMDb {movie.rating}</span>
            </p>
          </div>
        </div>
      </div>

      <main className="container booking-container">
        <section className="details-column">
          <h2>Movie Overview</h2>
          <p dangerouslySetInnerHTML={{ __html: movie.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          
          {movie.trailer && (
            <div className="about-section">
              <h3><i className="fas fa-video"></i> Official Trailer</h3>
              <div className="trailer-container" style={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                marginBottom: '2rem',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <ReactPlayer
                  url={movie.trailer}
                  width="100%"
                  height="100%"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                  controls={true}
                  playing={false}
                  light={false}
                />
              </div>
            </div>
          )}

          <div className="about-section">
            <h3><i className="fas fa-info-circle"></i> Key Details</h3>
            <ul className="feature-list">
              <li><i className="fas fa-check-circle"></i> Director: {movie.director}</li>
              <li><i className="fas fa-check-circle"></i> Starring: {movie.stars}</li>
              <li><i className="fas fa-check-circle"></i> Studio: {movie.studio}</li>
            </ul>
          </div>
        </section>

        <aside className="booking-column">
          <h3>Book Tickets</h3>
          <p>Current showtimes and seat selection for this location.</p>
          <Link to={`/movies/${movieSlug}/showtimes`} className="btn checkout-btn">
            <i className="fas fa-ticket-alt"></i> Check Showtimes & Book
          </Link>
          <p className="muted" style={{ textAlign: 'center', marginTop: '1rem' }}>
            Tickets start from ₹{movie.defaultPrice} onwards.
          </p>
        </aside>
      </main>
    </>
  );
}

