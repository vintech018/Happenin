// movies.js - UPDATED TO SUPPORT JOKER: FOLIE À DEUX FLOW

document.getElementById('year3').textContent = new Date().getFullYear();

const apiKey = "84176f5f"; 
const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const categoryLinks = document.querySelectorAll(".category-nav a"); 

let allMoviesData = []; 

const trendingMovies = [
  "Dune: Part Two",
  "Joker: Folie à Deux", // Target movie
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
    const primaryGenre = movie.Genre ? movie.Genre.split(",")[0].trim() : "Movie";
    let bookNowContent = "";
    
    // --- Linking Logic for Joker ---
    if (movie.Title === "Joker: Folie à Deux") {
        // Link the specific movie to its new detail page
        bookNowContent = `<a href="joker.html" class="btn">Book now</a>`;
    } else if (movie.Title === "Dune: Part Two") {
        // Keep the existing link for Dune
        bookNowContent = `<a href="dune-part-two.html" class="btn">Book now</a>`;
    } 
    else {
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

// Function to fetch all movies and initialize the grid (rest of the file remains the same)
async function initializeMovies() {
  movieGrid.innerHTML = "<p class='loading-text'>Loading latest movies...</p>";
  
  // Placeholder data for consistent rendering
  const jokerPlaceholder = {
    Title: "Joker: Folie à Deux",
    Year: "2024",
    imdbRating: "5.2",
    Genre: "Drama, Musical",
    Poster: "images/fight_club.jpg" // Using an existing placeholder
  };
    
  const moviePromises = trendingMovies.map(title => fetchMovie(title));
  const fetchedResults = await Promise.all(moviePromises);

  allMoviesData = fetchedResults.filter(movie => movie !== null);

  // Ensure Joker: Folie à Deux is present
  if (!allMoviesData.find(m => m.Title === "Joker: Folie à Deux")) {
      allMoviesData.splice(1, 0, jokerPlaceholder); 
  }

  renderMovies(allMoviesData);
}

// (Other functions like filterMoviesByGenre, event listeners, and footer logic remain the same)
// ... [rest of movies.js]

initializeMovies();