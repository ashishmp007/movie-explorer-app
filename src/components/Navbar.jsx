import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav style={{ padding: "10px", background: "#111", color: "white" }}>
      <h2>Movie Explorer</h2>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/" style={{ color: "white" }}>
          Home
        </Link>
        <Link to="/search" style={{ color: "white" }}>
          Search
        </Link>
        <Link to="/favorites" style={{ color: "white" }}>
          Favorites
        </Link>

        {!user ? (
          <Link to="/login" style={{ color: "white" }}>
            Login
          </Link>
        ) : (
          <>
            <span>{user.name}</span>
            <img
              src={user.picture}
              alt="profile"
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
