import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { omdb } from '../services/omdb';

const trendingMovies = [
  "Dune: Part Two",
  "Joker: Folie à Deux",
  "Venom: The Last Dance"
];

const placeholders = {
  "Dune: Part Two": { Title: "Dune: Part Two", Year: "2024", imdbRating: "8.4", Genre: "Action, Sci-Fi", Poster: "images/interstellar.jpg" },
  "Joker: Folie à Deux": { Title: "Joker: Folie à Deux", Year: "2024", imdbRating: "5.2", Genre: "Drama, Musical", Poster: "images/fight_club.jpg" },
  "Venom: The Last Dance": { Title: "Venom: The Last Dance", Year: "2024", imdbRating: "6.0", Genre: "Action, Sci-Fi", Poster: "images/dark_knight.jpg" }
};

export default function Home() {
  const navigate = useNavigate();
  const [topMovies, setTopMovies] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Load live events from JSON Server
        const eventsData = await api.getLiveEvents();
        setLiveEvents(eventsData.slice(0, 3));

        // Load top 3 movies from OMDb API
        const fetchedMovies = await omdb.fetchMovies(trendingMovies);
        let movies = fetchedMovies.filter(m => m !== null);

        // Add placeholders if API fails
        trendingMovies.forEach(title => {
          if (!movies.find(m => m.Title === title)) {
            movies.push(placeholders[title]);
          }
        });

        // Limit to top 3
        movies = movies.slice(0, 3);
        setTopMovies(movies);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getMovieLink = (title) => {
    if (title === "Venom: The Last Dance") return "/movies/venom";
    if (title === "Joker: Folie à Deux") return "/movies/joker";
    if (title === "Dune: Part Two") return "/movies/dune-part-two";
    return "/checkout";
  };

  return (
    <>
      <section className="hero">
        <h1>Welcome to Happenin</h1>
        <p>Find the best movies, concerts & stand-up shows near you.</p>
        <Link to="/movies" className="btn">Explore Now</Link>
      </section>

      <main className="container">
        <section className="list-page">
          <h2>Happening This Week</h2>
          {loading ? (
            <p className="loading-text">Loading events...</p>
          ) : (
            <div className="grid">
              {liveEvents.map(event => (
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
                    <span className="price">₹{event.price} onwards</span>
                    <button 
                      onClick={() => navigate(`/live-events/${event.id}`)} 
                      className="btn"
                      style={{
                        display: 'block',
                        background: '#5928E5',
                        color: '#F1F1F1',
                        padding: '0.5rem 1.25rem',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.9rem'
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

        <section className="list-page">
          <h2>Top Movies Near You</h2>
          {loading ? (
            <p className="loading-text">Loading top movies...</p>
          ) : (
            <div className="grid">
              {topMovies.map((movie, idx) => {
                const primaryGenre = movie.Genre ? movie.Genre.split(",")[0].trim() : "Movie";
                const movieLink = getMovieLink(movie.Title);
                
                return (
                  <article key={idx} className="tile">
                    <div className="thumb">
                      <img src={movie.Poster !== "N/A" ? movie.Poster : "images/placeholder.jpg"} alt={movie.Title} />
                      <span className="category-badge">{primaryGenre}</span>
                    </div>
                    <h4>{movie.Title}</h4>
                    <p className="muted">{movie.Year} • IMDb {movie.imdbRating}</p>
                    <div className="price-row">
                      <span className="price">₹{Math.floor(Math.random() * 200 + 250)} onwards</span>
                      <button 
                        onClick={() => navigate(movieLink)} 
                        className="btn"
                        style={{
                          display: 'block',
                          background: '#5928E5',
                          color: '#F1F1F1',
                          padding: '0.5rem 1.25rem',
                          borderRadius: '8px',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.9rem'
                        }}
                      >
                        Book now
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
