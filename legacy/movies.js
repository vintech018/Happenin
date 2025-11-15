// movies.js - FIX: ADDED STRICT SORTING BY MOVIE TITLE

document.getElementById('year3').textContent = new Date().getFullYear();

const apiKey = "84176f5f"; 
const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const categoryLinks = document.querySelectorAll(".category-nav a"); 

let allMoviesData = []; 

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
    const primaryGenre = movie.Genre ? movie.Genre.split(",")[0].trim() : "Movie";
    let bookNowContent = "";
    
    // --- Linking Logic (unchanged) ---
    if (movie.Title === "The Batman") {
        bookNowContent = `<a href="thebatman.html" class="btn">Book now</a>`;
    } else if (movie.Title === "Inside Out 2") {
        bookNowContent = `<a href="insideout2.html" class="btn">Book now</a>`;
    } else if (movie.Title === "Oppenheimer") {
        bookNowContent = `<a href="oppenheimer.html" class="btn">Book now</a>`;
    } else if (movie.Title === "Deadpool & Wolverine") {
        bookNowContent = `<a href="deadpool.html" class="btn">Book now</a>`;
    } else if (movie.Title === "Venom: The Last Dance") {
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

// Function to filter movies by genre
function filterMoviesByGenre(genre) {
  if (genre === "All") {
    renderMovies(allMoviesData);
    return;
  }
  
  const filteredMovies = allMoviesData.filter(movie => 
    movie.Genre && movie.Genre.split(',').map(g => g.trim()).includes(genre)
  );
  
  renderMovies(filteredMovies);
}

// Function to handle category link clicks
categoryLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Update active class
    categoryLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    
    const genre = this.textContent.trim();
    filterMoviesByGenre(genre);
  });
});

// Function to fetch all movies and initialize the grid
async function initializeMovies() {
  movieGrid.innerHTML = "<p class='loading-text'>Loading latest movies...</p>";
  
  // Placeholder data (kept for consistency)
  const thebatmanPlaceholder = {
    Title: "The Batman",
    Year: "2022",
    imdbRating: "7.8",
    Genre: "Action, Crime, Drama",
    Poster: "images/dark_knight.jpg" 
  };
    
  const moviePromises = trendingMovies.map(title => fetchMovie(title));
  const fetchedResults = await Promise.all(moviePromises);

  allMoviesData = fetchedResults.filter(movie => movie !== null);

  // Ensure placeholders are present if API fails
  if (!allMoviesData.find(m => m.Title === "The Batman")) {
      allMoviesData.push(thebatmanPlaceholder); 
  }
  
  // === FIX: STRICT SORTING BY TITLE ===
  allMoviesData.sort((a, b) => a.Title.localeCompare(b.Title));

  renderMovies(allMoviesData);
}

initializeMovies();