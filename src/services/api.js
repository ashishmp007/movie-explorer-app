import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getTrendingMovies = async (page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?page=${page}&api_key=${API_KEY}`,
  );

  const data = await response.json();
  return data;
};

export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US`,
  );

  return response.data.results;
};
