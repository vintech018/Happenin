import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { omdb } from '../services/omdb';

const categories = ['All', 'Action', 'Drama', 'Sci-Fi', 'Comedy', 'Horror', 'Romance', 'Thriller'];

const trendingMovies = [
  "Dune: Part Two",
  "Joker: Folie à Deux",
  "Venom: The Last Dance",
  "Deadpool & Wolverine",
  "Oppenheimer",
  "Inside Out 2",
  "The Batman"
];

// Placeholder data for fallback
const thebatmanPlaceholder = {
  Title: "The Batman",
  Year: "2022",
  imdbRating: "7.8",
  Genre: "Action, Crime, Drama",
  Poster: "images/dark_knight.jpg"
};

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      
      // Fetch movies from OMDb API
      const fetchedResults = await omdb.fetchMovies(trendingMovies);
      let allMoviesData = fetchedResults.filter(movie => movie !== null);

      // Ensure placeholders are present if API fails
      if (!allMoviesData.find(m => m.Title === "The Batman")) {
        allMoviesData.push(thebatmanPlaceholder);
      }

      // Sort by title
      allMoviesData.sort((a, b) => a.Title.localeCompare(b.Title));

      setMovies(allMoviesData);
      setFilteredMovies(allMoviesData);
      setLoading(false);
    }
    loadMovies();
  }, []);

  useEffect(() => {
    let filtered = movies;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(movie =>
        movie.Genre && movie.Genre.split(',').map(g => g.trim()).includes(selectedCategory)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMovies(filtered);
  }, [selectedCategory, searchQuery, movies]);

  const getMovieLink = (title) => {
    if (title === "The Batman") return "/movies/thebatman";
    if (title === "Inside Out 2") return "/movies/insideout2";
    if (title === "Oppenheimer") return "/movies/oppenheimer";
    if (title === "Deadpool & Wolverine") return "/movies/deadpool";
    if (title === "Venom: The Last Dance") return "/movies/venom";
    if (title === "Joker: Folie à Deux") return "/movies/joker";
    if (title === "Dune: Part Two") return "/movies/dune-part-two";
    return "/checkout";
  };

  return (
    <main className="container">
      <section className="list-page">
        <h1>Movies</h1>

        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-nav">
          {categories.map(category => (
            <button
              key={category}
              className={`category-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="loading-text">Loading latest movies...</p>
        ) : filteredMovies.length === 0 ? (
          <p className="loading-text">No movies found for this selection.</p>
        ) : (
          <div className="grid">
            {filteredMovies.map((movie, idx) => {
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
                    <Link to={movieLink} className="btn">Book now</Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
