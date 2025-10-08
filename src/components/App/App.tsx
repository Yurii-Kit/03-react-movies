import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movies";
import { fetchMovies } from "../../services/movieServices";
import MovieGrid from "../MovieGrid/MovieGrid";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);
      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={css.app}>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} /> {isLoading && <p>Loading...</p>}
      {isError && <p style={{ color: "red" }}>Something went wrong 😢</p>}
      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={() => {}} />
      )}
    </div>
  );
}

export default App;
