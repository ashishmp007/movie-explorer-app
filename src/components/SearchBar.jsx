import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          onSearch(value); // 🔥 live update + clear on empty
        }}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;