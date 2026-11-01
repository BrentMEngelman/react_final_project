const API_KEY = "9e4f1ce2";
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query, page = 1, type = "") {
  const params = new URLSearchParams({
    apikey: API_KEY,
    s: query,
    page: page.toString(),
  });

  if (type) {
    params.append("type", type);
  }

  const response = await fetch(`${BASE_URL}?${params.toString()}`);
  return await response.json();
}

export async function getMovieDetails(imdbID) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    i: imdbID,
    plot: "full",
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`);
  return await response.json();
}
