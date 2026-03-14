import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "ac316c28347495f1c0971282d59a8531";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((res) => setMovie(res.data));

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`,
      )
      .then((res) => setCast(res.data.cast));
  }, [id]);

  const addToFavorites = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first");
    return;
  }

  const key = `favorites_${user.email}`;

  const existingFavs = JSON.parse(localStorage.getItem(key)) || [];

  const alreadyAdded = existingFavs.some(
    (item) => item.id === movie.id
  );

  if (alreadyAdded) {
    alert("Movie already in favorites");
    return;
  }

  const updatedFavs = [...existingFavs, movie];

  localStorage.setItem(key, JSON.stringify(updatedFavs));

  alert("Movie added to favorites ❤️");
};

  if (!movie) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{movie.title}</h1>

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        style={{ width: "200px" }}
      />

      <p>
        <b>Rating:</b> ⭐ {movie.vote_average}
      </p>
      <p>
        <b>Release Date:</b> {movie.release_date}
      </p>

      <h3>Genres</h3>
      <p>{movie.genres.map((g) => g.name).join(", ")}</p>

      <h3>Overview</h3>
      <p>{movie.overview}</p>

      {/* Favorite button */}
      <button
        onClick={addToFavorites}
        style={{
          padding: "10px 15px",
          background: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ❤️ Add to Favorites
      </button>

      <h2>Top Cast</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {cast.slice(0, 6).map((actor) => (
          <div key={actor.id} style={{ width: "120px" }}>
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                }}
              />
            )}

            <p>
              <b>{actor.name}</b>
            </p>

            <p style={{ fontSize: "12px" }}>{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetails;
