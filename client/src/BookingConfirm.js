import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData, movie, screen } = location.state || {};

  if (!movie) return <p>No booking found!</p>;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8f9fa",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          width: "420px",
          textAlign: "center",
          boxShadow: "0px 5px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ color: "#28a745", marginBottom: "15px" }}>
          🎉 Booking Confirmed!
        </h2>

        {/* Movie Poster */}
        {movie.poster && (
          <img
            src={`/${movie.poster}`}
            alt={movie.name}
            style={{
              width: "200px",
              height: "280px",
              borderRadius: "10px",
              marginBottom: "15px",
              objectFit: "cover",
            }}
          />
        )}

        {/* Booking Details */}
        <p style={{ fontSize: "16px", marginBottom: "10px" }}>
          Your booking for <strong>{movie.title}</strong> is confirmed.
        </p>
        {screen && (
          <p>
            <strong>Theater:</strong> {screen.name} ({screen.location})
          </p>
        )}
        <p>
          <strong>Booking Date:</strong> {bookingData?.date || "Not selected"}
        </p>
        <p>
          <strong>Seats:</strong>{" "}
          {Array.isArray(bookingData?.seats)
            ? bookingData.seats.join(", ")
            : bookingData?.seats || "Not available"}
        </p>
        <p>
          <strong>Total Paid:</strong> ₹{bookingData?.price || 0}
        </p>

        <button
          onClick={() =>
            navigate("/ticket", { state: { bookingData, movie, screen } })
          }
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Show Ticket
        </button>
      </div>
    </div>
  );
};

export default BookingConfirm;
