import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null); // store logged-in user info
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch movies
    fetch("http://localhost:5000/api/movies")
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error(err));

    // Simulate fetching logged-in user from localStorage/session
    const loggedUser = localStorage.getItem("user"); // e.g., { "name": "Vishva" }
    if (loggedUser) setUser(JSON.parse(loggedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      {/* Header */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        backgroundColor: "#007bff",
        color: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px"
      }}>
        <h1 style={{ fontSize: "2em", margin: 0, fontWeight: "bold", textAlign: "center" }}>🎬 Movie List</h1>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {user ? (
            <>
              <span>Hello, <strong>{user.name}</strong></span>
              <button
                onClick={handleLogout}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#ff4d4f",
                  border: "none",
                  borderRadius: "5px",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  color: "#007bff",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  color: "#007bff",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Register
              </button>
            </>
          )}
        </div>
      </header>

      {/* Movie List */}
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h2 style={{
          marginBottom: "30px",
          fontSize: "2.2em",
          fontWeight: "bold",
          color: "#333",
          textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
        }}>
          🎬 Now Showing
        </h2>

        {movies.length === 0 ? (
          <p>No movies available.</p>
        ) : (
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px"
          }}>
            {movies.map(movie => (
              <div
                key={movie.movie_id}
                style={{
                  width: "220px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  backgroundColor: "#fff",
                  textAlign: "center",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  style={{ width: "100%", height: "300px", objectFit: "cover" }}
                />
                <div style={{ padding: "10px" }}>
                  <h3 style={{ margin: "10px 0", fontSize: "1.2em", fontWeight: "bold" }}>{movie.title}</h3>
                  <p style={{ margin: "5px 0" }}><strong>Genre:</strong> {movie.genre}</p>
                  <p style={{ margin: "5px 0" }}><strong>Release:</strong> {movie.release_date}</p>
                  <p style={{ margin: "5px 0", fontWeight: "bold", color: "#007bff" }}>₹{movie.price}</p>

                  <button
                    onClick={() => navigate(`/movie/${movie.movie_id}`)}
                    style={{
                      marginTop: "10px",
                      padding: "8px 12px",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "100%",
                      fontWeight: "bold"
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
