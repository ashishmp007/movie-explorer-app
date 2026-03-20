import { Link } from "react-router-dom";

function Navbar({ toggleTheme, theme }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  // 🔥 dynamic text color
  const textColor = theme === "light" ? "#000" : "#fff";

  return (
    <nav
      style={{
        padding: "10px",
        background: theme === "light" ? "#fff" : "#111",
        color: textColor,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <h2>Movie Explorer</h2>

        <Link to="/" style={{ color: textColor, textDecoration: "none" }}>
          Home
        </Link>

        <Link to="/search" style={{ color: textColor, textDecoration: "none" }}>
          Search
        </Link>

        <Link
          to="/favorites"
          style={{ color: textColor, textDecoration: "none" }}
        >
          Favorites
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {!user ? (
          <Link
            to="/login"
            style={{ color: textColor, textDecoration: "none" }}
          >
            Login
          </Link>
        ) : (
          <>
            <span>{user.name}</span>

            <img
              src={user?.picture || "https://via.placeholder.com/35"}
              alt="profile"
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />

            <button
              onClick={handleLogout}
              style={{
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}

        {/* 🌙 Theme Button */}
        <button
          onClick={toggleTheme}
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
