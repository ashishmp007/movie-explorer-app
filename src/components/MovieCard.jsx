import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = favorites.find((m) => m.id === movie.id);
    setIsFavorite(!!exists);
  }, [movie.id]);

  const toggleFavorite = () => {
    if (!user) {
      alert("Please login to add favorites");
      return;
    }

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      const updated = favorites.filter((m) => m.id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      const updated = [...favorites, movie];
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(true);
    }

    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <div
      style={{
        width: "200px",
        border: "1px solid #ddd",
        padding: "10px",
        background: "white",
      }}
    >
      <Link
        to={`/movie/${movie.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
          }}
        />

        <h3>{movie.title}</h3>

        <p>⭐ {movie.vote_average}</p>
      </Link>

      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        style={{
          width: "100%",
          marginTop: "5px",
          cursor: "pointer",
        }}
      >
        {isFavorite ? "Remove ❌" : "Add ⭐"}
      </button>
    </div>
  );
}

export default MovieCard;
