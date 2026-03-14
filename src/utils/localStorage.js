export const saveFavorites = (movie) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    alert("Please login to add favorites");
    return;
  }

  const favs = JSON.parse(localStorage.getItem("favorites")) || [];

  const alreadyAdded = favs.some((fav) => fav.id === movie.id);

  if (alreadyAdded) {
    alert("Movie already in favorites");
    return;
  }

  favs.push(movie);

  localStorage.setItem("favorites", JSON.stringify(favs));
};