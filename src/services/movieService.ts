import axios from "axios";
import { type Movie } from "../types/movie";

interface MoviesHttpResponse {
  results: Movie[];
}

const myKey = import.meta.env.VITE_TMDB_TOKEN;

// HTTP-функція запиту до API
export const fetchMovies = async (topic: string): Promise<Movie[]> => {
  const options = {
    headers: { Authorization: `Bearer ${myKey}` },
    params: { query: topic },
  };
  const response = await axios.get<MoviesHttpResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    options
  );
  console.log(response.data.results);

  return response.data.results;
};
