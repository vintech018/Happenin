// movies.js - UPDATED TO SUPPORT VENOM: THE LAST DANCE FLOW

document.getElementById('year3').textContent = new Date().getFullYear();

const apiKey = "84176f5f"; 
const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const categoryLinks = document.querySelectorAll(".category-nav a"); 

let allMoviesData = []; 

const trendingMovies = [
  "Dune: Part Two",
  "Joker: Folie à Deux", 
  "Venom: The Last Dance", // Target movie
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
    
    // --- Linking Logic for Venom, Joker, and Dune ---
    if (movie.Title === "Venom: The Last Dance") {
        bookNowContent = `<a href="venom.html" class="btn">Book now</a>`;
    } else if (movie.Title === "Joker: Folie à Deux") {
        bookNowContent = `<a href="joker.html" class="btn">Book now</a>`;
    } else if (movie.Title === "Dune: Part Two") {
        bookNowContent = `<a href="dune-part-two.html" class="btn">Book now</a>`;
    } 
    else {
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
  
  // Placeholder data for consistent rendering
  const venomPlaceholder = {
    Title: "Venom: The Last Dance",
    Year: "2024",
    imdbRating: "6.0",
    Genre: "Action, Sci-Fi",
    Poster: "images/dark_knight.jpg" 
  };
    
  const moviePromises = trendingMovies.map(title => fetchMovie(title));
  const fetchedResults = await Promise.all(moviePromises);

  allMoviesData = fetchedResults.filter(movie => movie !== null);

  // Ensure Venom: The Last Dance is present
  if (!allMoviesData.find(m => m.Title === "Venom: The Last Dance")) {
      allMoviesData.splice(2, 0, venomPlaceholder); 
  }

  renderMovies(allMoviesData);
}

// (Other functions like filterMoviesByGenre, event listeners, and footer logic remain the same)
// ... [rest of movies.js]

initializeMovies();