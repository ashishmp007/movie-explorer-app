import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { searchMovies } from "../services/api";
import { useNavigate } from "react-router-dom";

function Search() {
  const [movies, setMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setMovies([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    try {
      const results = await searchMovies(query);
      setMovies(results);
      setHasSearched(true);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Search Movies</h2>

      <SearchBar onSearch={handleSearch} />

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Movies */}
      {movies.length > 0 && (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => navigate(`/movie/${movie.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width="150"
              />
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {hasSearched && !loading && movies.length === 0 && (
        <p>No results found</p>
      )}

      {/* Initial */}
      {!hasSearched && <p>Search for movies...</p>}
    </div>
  );
}

export default Search;