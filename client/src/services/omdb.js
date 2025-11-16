const API_KEY = "84176f5f";

export const omdb = {
  async fetchMovie(title) {
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.Response === "True" ? data : null;
    } catch {
      return null;
    }
  },

  async fetchMovies(titles) {
    const promises = titles.map(title => omdb.fetchMovie(title));
    const results = await Promise.all(promises);
    return results.filter(movie => movie !== null);
  }
};

