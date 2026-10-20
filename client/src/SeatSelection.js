import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, screen } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);

  // Generate 50 seats dynamically (Rows A–E, 10 seats each)
  const seats = [];
  const rows = ["A", "B", "C", "D", "E"];
  rows.forEach((row) => {
    for (let i = 1; i <= 10; i++) {
      seats.push(`${row}${i}`);
    }
  });

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const confirmSeats = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }
    // 👇 Navigate with movieId & screenId in URL
    navigate(`/booking/${movie.id}/${screen.id}`, {
      state: { movie, screen, selectedSeats },
    });
  };

  if (!movie) return <p>No movie selected!</p>;

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      minHeight: "100vh",
      padding: "20px",
      backgroundColor: "#f8f9fa"
    }}>
      <div style={{
        width: "500px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center" }}>Select Your Seats</h2>

        {/* Seat Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gap: "8px",
          marginBottom: "20px",
          justifyItems: "center"
        }}>
          {seats.map((seat) => (
            <button
              key={seat}
              onClick={() => toggleSeat(seat)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: selectedSeats.includes(seat) ? "2px solid green" : "1px solid #ccc",
                backgroundColor: selectedSeats.includes(seat) ? "#28a745" : "#fff",
                color: selectedSeats.includes(seat) ? "#fff" : "#000",
                cursor: "pointer",
                width: "40px",
              }}
            >
              {seat}
            </button>
          ))}
        </div>

        <p><strong>Selected Seats:</strong> {selectedSeats.join(", ") || "None"}</p>
        <p><strong>Total Price:</strong> ₹{(movie?.price || 0) * selectedSeats.length}</p>

        <button onClick={confirmSeats} style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Confirm Seats
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
