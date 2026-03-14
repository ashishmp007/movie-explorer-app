import { useEffect, useState, useContext } from "react";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContext";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);

  const loadFavorites = () => {
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(fav);
  };

  useEffect(() => {

    if (!user) {
      setFavorites([]);
      return;
    }

    loadFavorites();

    window.addEventListener("favoritesUpdated", loadFavorites);

    return () => {
      window.removeEventListener("favoritesUpdated", loadFavorites);
    };

  }, [user]);

  if (!user) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Please login to see favorites
      </h2>
    );
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {favorites.length === 0 ? (
        <h2>No Favorites Added</h2>
      ) : (
        favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      )}
    </div>
  );
}

export default Favorites;
