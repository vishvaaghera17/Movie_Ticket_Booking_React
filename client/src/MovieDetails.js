import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState(null);
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch single movie
        const resMovie = await fetch(`http://localhost:5000/api/movies/${movie_id}`);
        if (!resMovie.ok) throw new Error("Movie not found");
        const movieData = await resMovie.json();
        setMovie(movieData);

        // Fetch screens showing this movie
        const resScreens = await fetch(`http://localhost:5000/api/screens?movie_id=${movie_id}`);
        if (!resScreens.ok) throw new Error("Screens not found");
        const screenData = await resScreens.json();
        setScreens(screenData);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchData();
  }, [movie_id]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      minHeight: "100vh",
      backgroundColor: "#f0f2f5"
    }}>
      {/* Movie Card */}
      <div style={{
        width: "400px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        marginBottom: "20px"
      }}>
        <h2>{movie.name}</h2>
        {movie.poster && <img src={`/${movie.poster}`} alt={movie.name} width="200" style={{ borderRadius: "10px" }} />}
        <h3 style={{ margin: "10px 0", fontSize: "1.2em", fontWeight: "bold" }}>{movie.title}</h3>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Price:</strong> ₹{movie.price}</p>
      </div>

      <h3>Available Screens</h3>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px"
      }}>
        {screens.length === 0 ? (
          <p>No screens available for this movie.</p>
        ) : (
          screens.map(screen => (
            <div
              key={screen.screen_id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "10px",
                width: "200px",
                textAlign: "center",
                backgroundColor: "#fff",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)"
              }}
            >
              {screen.screen_img && <img src={`/${screen.screen_img}`} alt={screen.name} width="150" style={{ borderRadius: "10px" }} />}
              <p><strong>{screen.name}</strong></p>
              <p>Location: {screen.location}</p>
              <button
                onClick={() => navigate(`/booking/${movie.movie_id}/${screen.screen_id}`, {
                  state: { movie, screen }
                })}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Book Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
