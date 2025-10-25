document.getElementById('year3').textContent = new Date().getFullYear();

const apiKey = "84176f5f"; // Replace with your OMDb key
const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");

const trendingMovies = [
  "Dune: Part Two",
  "Joker: Folie à Deux",
  "Venom: The Last Dance",
  "Deadpool & Wolverine",
  "Oppenheimer",
  "Inside Out 2",
  "The Batman"
];

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

async function displayMovies(list) {
  movieGrid.innerHTML = "";
  for (const title of list) {
    const movie = await fetchMovie(title);
    if (movie) {
      movieGrid.innerHTML += `
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
  }
}

displayMovies(trendingMovies);

// Enable search
searchInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const query = e.target.value.trim();
    if (!query) return;
    movieGrid.innerHTML = "<p class='loading-text'>Searching...</p>";
    const movie = await fetchMovie(query);
    if (movie) {
      displayMovies([movie.Title]);
    } else {
      movieGrid.innerHTML = "<p class='loading-text'>No movie found.</p>";
    }
  }
});

// Scroll to top
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
  scrollToTopBtn.classList.toggle('show', window.pageYOffset > 300);
});
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
