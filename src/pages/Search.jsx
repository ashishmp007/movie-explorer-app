import { useState } from "react";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query) return;

    const results = await searchMovies(query);

    const filteredResults = results.filter((item) => {
      const title = (item.title || item.name || "").toLowerCase();
      return title.includes(query.toLowerCase());
    });

    setMovies(filteredResults);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Movies</h2>

      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            marginRight: "10px",
          }}
        />

        <button type="submit" style={{ padding: "10px 20px" }}>
          Search
        </button>
      </form>

      {movies.length === 0 && <p>No results found</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Search;
