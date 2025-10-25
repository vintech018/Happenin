document.addEventListener('DOMContentLoaded', function() {
  const apiKey = "84176f5f"; // Using the same OMDb API key as in movies.js
  const topMoviesSection = document.querySelector('section.list-page:nth-of-type(2) .grid');
  const categoryItems = document.querySelectorAll('.category-nav .category-item');
  
  // Using the same trending movies array from movies.js
  const trendingMovies = [
    "Dune: Part Two",
    "Joker: Folie à Deux",
    "Venom: The Last Dance",
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
    // Clear existing content
    topMoviesSection.innerHTML = "<p class='loading-text'>Loading top movies...</p>";
    
    fetchedMovies = [];
    
    for (const title of topThreeMovies) {
      const movie = await fetchMovie(title);
      if (movie) {
        fetchedMovies.push(movie);
      }
    }
    
    displayMovies(fetchedMovies);
  }
  
  function displayMovies(movies) {
    let moviesHTML = "";
    
    if (movies.length === 0) {
      topMoviesSection.innerHTML = "<p class='loading-text'>No movies found for this genre.</p>";
      return;
    }
    
    for (const movie of movies) {
      moviesHTML += `
        <article class="tile">
          <div class="thumb">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "images/placeholder.jpg"}" alt="${movie.Title}">
            <span class="category-badge">${movie.Genre.split(",")[0]}</span>
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
    
    // Update the section with the new content
    topMoviesSection.innerHTML = moviesHTML;
  }
  
  // Filter movies by genre
  function filterMoviesByGenre(genre) {
    if (genre === "All") {
      displayMovies(fetchedMovies);
      return;
    }
    
    // For "Movies" category, show all movies
    if (genre === "Movies") {
      displayMovies(fetchedMovies);
      return;
    }
    
    const filteredMovies = fetchedMovies.filter(movie => {
      const genres = movie.Genre.split(", ");
      return genres.some(g => g.toLowerCase().includes(genre.toLowerCase()) || 
                      genre.toLowerCase().includes(g.toLowerCase()));
    });
    
    displayMovies(filteredMovies);
  }
  
  // Add event listeners to category items
  categoryItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all items
      categoryItems.forEach(i => i.classList.remove('active'));
      
      // Add active class to clicked item
      this.classList.add('active');
      
      // Filter movies by genre
      const genre = this.textContent.trim();
      filterMoviesByGenre(genre);
    });
  });
  

  // Call the function to fetch and display top movies
  fetchAllMovies();
});