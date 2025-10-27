// movies.js - UPDATED TO SUPPORT DUNE: PART TWO FLOW

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
    
    // --- Custom Link Logic for the new flow ---
    let bookNowContent = "";
    if (movie.Title === "Dune: Part Two") {
        // Link the specific movie to the new detail page (Step 1)
        bookNowContent = `<a href="dune-part-two.html" class="btn">Book now</a>`;
    } else {
        // Generic "Book now" link for other movies
        bookNowContent = `<a href="checkout.html" class="btn">Book now</a>`;
    }
    // ------------------------------------------

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
          ${bookNowContent}
        </div>
      </article>
    `;
  }
  movieGrid.innerHTML = moviesHTML;
}

// Function to fetch all movies and initialize the grid
async function initializeMovies() {
  movieGrid.innerHTML = "<p class='loading-text'>Loading latest movies...</p>";
  
  // Placeholder data for consistent rendering, even if API fails
  const dunePlaceholder = {
    Title: "Dune: Part Two",
    Year: "2024",
    imdbRating: "8.4",
    Genre: "Action, Sci-Fi",
    Poster: "images/interstellar.jpg" 
  };
    
  const moviePromises = trendingMovies.map(title => fetchMovie(title));
  const fetchedResults = await Promise.all(moviePromises);

  allMoviesData = fetchedResults.filter(movie => movie !== null);

  // Ensure Dune: Part Two is present
  if (!allMoviesData.find(m => m.Title === "Dune: Part Two")) {
      allMoviesData.unshift(dunePlaceholder); 
  }

  renderMovies(allMoviesData);
}

// Function to filter movies by genre (UPDATED FOR STRICT MATCH)
function filterMoviesByGenre(genre) {
  if (genre.toLowerCase() === 'all') {
    renderMovies(allMoviesData);
    return;
  }
  const filteredList = allMoviesData.filter(movie => {
    if (!movie.Genre) return false; 
    const primaryGenre = movie.Genre.split(',')[0].trim();
    return primaryGenre.toLowerCase() === genre.toLowerCase();
  });
  renderMovies(filteredList);
}

// --- Event Listeners ---
categoryLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    categoryLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    filterMoviesByGenre(this.textContent.trim());
  });
});

searchInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const query = e.target.value.trim();
    if (!query) return;
    categoryLinks.forEach(l => l.classList.remove('active'));
    movieGrid.innerHTML = "<p class='loading-text'>Searching...</p>";
    const movie = await fetchMovie(query);

    if (movie) {
      renderMovies([movie]);
    } else {
      movieGrid.innerHTML = "<p class='loading-text'>No movie found.</p>";
    }
  }
});

initializeMovies();

// Scroll to top (Existing logic)
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
  scrollToTopBtn.classList.toggle('show', window.pageYOffset > 300);
});
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});