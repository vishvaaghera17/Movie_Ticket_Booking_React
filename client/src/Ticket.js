import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData, movie, screen } = location.state || {};

  // ✅ Send ticket data to backend when component mounts
  useEffect(() => {
    if (movie && bookingData) {
      axios
        .post("http://localhost:5000/api/tickets/save-ticket", {
          movie,
          screen,
          bookingData,
        })
        .then((res) => console.log(res.data.message))
        .catch((err) => console.error("Error saving ticket:", err));
    }
  }, [movie, bookingData, screen]);

  if (!movie) return <p>No ticket available!</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          width: "450px",
          textAlign: "center",
          boxShadow: "0px 5px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ marginBottom: "15px", color: "#007bff" }}>
          🎟️ Your Ticket
        </h2>

        <p><strong>Movie:</strong> {movie.title}</p>
        {screen && (
          <p>
            <strong>Theater:</strong> {screen.name} ({screen.location})
          </p>
        )}
        <p><strong>Date:</strong> {bookingData?.date}</p>
        <p>
          <strong>Seats:</strong>{" "}
          {Array.isArray(bookingData?.seats)
            ? bookingData.seats.join(", ")
            : bookingData?.seats}
        </p>
        <p><strong>Booked By:</strong> {bookingData?.name}</p>
        <p><strong>Total Paid:</strong> ₹{bookingData?.price}</p>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Ticket;
