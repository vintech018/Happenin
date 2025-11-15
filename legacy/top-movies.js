document.addEventListener('DOMContentLoaded', function() {
  const apiKey = "84176f5f"; // Using the same OMDb API key as in movies.js
  const topMoviesSection = document.querySelector('section.list-page:nth-of-type(2) .grid');
  const categoryItems = document.querySelectorAll('.category-nav .category-item');
  
  // Using the same trending movies array from movies.js
  const trendingMovies = [
    "Dune: Part Two",
    "Joker: Folie à Deux",
    "Venom: The Last Dance", // Target movie is in the top 3
    "Deadpool & Wolverine",
    "Oppenheimer",
    "Inside Out 2",
    "The Batman"
  ];
  
  // We'll use only the top 3 movies
  const topThreeMovies = trendingMovies.slice(0, 3);
  let fetchedMovies = [];
  
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
  
  async function fetchAllMovies() {
    topMoviesSection.innerHTML = "<p class='loading-text'>Loading top movies...</p>";
    fetchedMovies = [];
    
    for (const title of topThreeMovies) {
      const movie = await fetchMovie(title);
      if (movie) {
        fetchedMovies.push(movie);
      }
    }
    
    // Ensure all top 3 movies are present using placeholders if API fetch fails
    const dunePlaceholder = { Title: "Dune: Part Two", Year: "2024", imdbRating: "8.4", Genre: "Action, Sci-Fi", Poster: "images/interstellar.jpg" };
    const jokerPlaceholder = { Title: "Joker: Folie à Deux", Year: "2024", imdbRating: "5.2", Genre: "Drama, Musical", Poster: "images/fight_club.jpg" };
    const venomPlaceholder = { Title: "Venom: The Last Dance", Year: "2024", imdbRating: "6.0", Genre: "Action, Sci-Fi", Poster: "images/dark_knight.jpg" };
    
    if (!fetchedMovies.find(m => m.Title === "Dune: Part Two")) fetchedMovies.push(dunePlaceholder);
    if (!fetchedMovies.find(m => m.Title === "Joker: Folie à Deux")) fetchedMovies.push(jokerPlaceholder);
    if (!fetchedMovies.find(m => m.Title === "Venom: The Last Dance")) fetchedMovies.push(venomPlaceholder);
    
    // Limit to exactly the top 3 for display
    fetchedMovies.length = 3; 

    displayMovies(fetchedMovies);
  }
  
  function displayMovies(movies) {
    let moviesHTML = "";
    
    if (movies.length === 0) {
      topMoviesSection.innerHTML = "<p class='loading-text'>No movies found for this genre.</p>";
      return;
    }
    
    for (const movie of movies) {
      const primaryGenre = movie.Genre ? movie.Genre.split(",")[0].trim() : "Movie";
      let bookNowContent = "";
      
      // --- Linking Logic Added ---
      if (movie.Title === "Venom: The Last Dance") {
        bookNowContent = `<a href="venom.html" class="btn">Book now</a>`;
      } else if (movie.Title === "Joker: Folie à Deux") {
        bookNowContent = `<a href="joker.html" class="btn">Book now</a>`;
      } else if (movie.Title === "Dune: Part Two") {
        bookNowContent = `<a href="dune-part-two.html" class="btn">Book now</a>`;
      } else {
        bookNowContent = `<span class="discount">Book now</span>`;
      }
      // ---------------------------
      
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
    
    topMoviesSection.innerHTML = moviesHTML;
  }
  
  // (Other functions like filterMoviesByGenre and event listeners remain the same)
  // ... [rest of top-movies.js]

  // Call the function to fetch and display top movies
  fetchAllMovies();
});