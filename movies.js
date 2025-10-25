document.getElementById('year3').textContent = new Date().getFullYear();

const apiKey = "84176f5f"; // Using the OMDb key
const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const categoryLinks = document.querySelectorAll(".category-nav a"); // Get all genre links

let allMoviesData = []; // Store the fetched movie objects here for filtering

const trendingMovies = [
  "Dune: Part Two",
  "Joker: Folie à Deux",
  "Venom: The Last Dance",
  "Deadpool & Wolverine",
  "Oppenheimer",
  "Inside Out 2",
  "The Batman"
];

// Helper function to fetch a single movie
async function fetchMovie(title) {
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.Response === "True" ? data : null;
  } catch {
    return null;
  }
}

// Function to render movies from an array of movie objects
function renderMovies(movies) {
  let moviesHTML = "";
  if (movies.length === 0) {
    movieGrid.innerHTML = "<p class='loading-text'>No movies found for this selection.</p>";
    return;
  }

  for (const movie of movies) {
    // Determine the primary genre for the badge
    const primaryGenre = movie.Genre ? movie.Genre.split(",")[0].trim() : "Movie";

    moviesHTML += `
      <article class="tile">
        <div class="thumb">
          <img src="${movie.Poster !== "N/A" ? movie.Poster : "images/placeholder.jpg"}" alt="${movie.Title}">
          <span class="category-badge">${primaryGenre}</span>
        </div>
        <h4>${movie.Title}</h4>
        <p class="muted">${movie.Year} • IMDb ${movie.imdbRating}</p>
        <div class="price-row">
          <span class="price">₹${Math.floor(Math.random()*200+250)} onwards</span>
          <span class="discount">Book now</span>
        </div>
      </article>
    `;
  }
  movieGrid.innerHTML = moviesHTML;
}

// Function to fetch all movies and initialize the grid
async function initializeMovies() {
  movieGrid.innerHTML = "<p class='loading-text'>Loading latest movies...</p>";
  
  const moviePromises = trendingMovies.map(title => fetchMovie(title));
  const fetchedResults = await Promise.all(moviePromises);

  // Filter out null results and store the successful movie objects
  allMoviesData = fetchedResults.filter(movie => movie !== null);

  // Display all movies initially
  renderMovies(allMoviesData);
}

// Function to filter movies by genre (UPDATED FOR STRICT MATCH)
function filterMoviesByGenre(genre) {
  // 1. Handle "All"
  if (genre.toLowerCase() === 'all') {
    renderMovies(allMoviesData);
    return;
  }

  // 2. Filter logic for STRICT MATCH: 
  // Only show the movie if the selected genre matches the movie's *primary* genre (the first one listed).
  const filteredList = allMoviesData.filter(movie => {
    // Ensure movie.Genre exists before splitting
    if (!movie.Genre) return false; 
      
    // Get the first genre listed and trim any whitespace
    const primaryGenre = movie.Genre.split(',')[0].trim();
    
    // Check for strict match
    return primaryGenre.toLowerCase() === genre.toLowerCase();
  });

  renderMovies(filteredList);
}

// --- Event Listeners ---

// 1. Category Filtering
categoryLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    // Update active class
    categoryLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    // Apply filter
    const genre = this.textContent.trim();
    filterMoviesByGenre(genre);
  });
});

// 2. Search (Updated to use the new renderMovies logic)
searchInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const query = e.target.value.trim();
    if (!query) return;

    // Reset category active state
    categoryLinks.forEach(l => l.classList.remove('active'));

    movieGrid.innerHTML = "<p class='loading-text'>Searching...</p>";
    const movie = await fetchMovie(query);

    if (movie) {
      // Display the single search result
      renderMovies([movie]);
    } else {
      movieGrid.innerHTML = "<p class='loading-text'>No movie found.</p>";
    }
  }
});

// 3. Initial Load
initializeMovies();

// Scroll to top (Existing logic)
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
  scrollToTopBtn.classList.toggle('show', window.pageYOffset > 300);
});
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});