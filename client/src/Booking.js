import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Make sure axios is imported

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, screen, selectedSeats } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    seats: selectedSeats || [],
    price: movie?.price || 0,
  });

  // Update seats & price when coming from SeatSelection
  useEffect(() => {
    if (selectedSeats) {
      setFormData((prev) => ({
        ...prev,
        seats: selectedSeats,
        price: (movie?.price || 0) * selectedSeats.length,
      }));
    }
  }, [selectedSeats, movie]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit booking and save to database
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.date || formData.seats.length === 0) {
      alert("Please fill all fields!");
      return;
    }

    try {
      // Send data to backend
      const response = await axios.post("http://localhost:5000/api/bookings", {
        name: formData.name,
        email: formData.email,
        date: formData.date,
        seats: formData.seats,
        price: formData.price,
        movieTitle: movie.title,
        genre: movie.genre,
        releaseDate: movie.release_date,
        theaterName: screen?.name || "",
        location: screen?.location || "",
      });

      console.log("Booking saved:", response.data);

      // Proceed to payment after saving
      navigate("/payment", { state: { bookingData: formData, movie, screen } });
    } catch (err) {
      console.error("Error saving booking:", err.response || err);

      // Show actual backend error
      const errorMessage = err.response?.data?.message || err.message || "Unknown error";
      alert(`❌ Failed to save booking in database! Error: ${errorMessage}`);
    }
  };

  // Navigate to SeatSelection Page
  const goToSeatSelection = () => {
    navigate("/seatselection", { state: { movie, screen } });
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
      backgroundColor: "#f0f2f5"
    }}>
      <div style={{
        width: "400px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center" }}>Booking Details</h2>

        {/* Movie Details */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h3>{movie.name}</h3>
          {movie.poster && (
            <img
              src={`/${movie.poster}`}
              alt={movie.name}
              width="200"
              style={{ borderRadius: "10px" }}
            />
          )}
          <h3 style={{ margin: "10px 0", fontSize: "1.2em", fontWeight: "bold" }}>{movie.title}</h3>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Price per Seat:</strong> ₹{movie.price}</p>
          {screen && (
            <>
              <p><strong>Screen:</strong> {screen.name}</p>
              <p><strong>Location:</strong> {screen.location}</p>
            </>
          )}
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: "100%" }} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: "100%" }} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} style={{ width: "100%" }} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Selected Seats:</label>
            <input
              type="text"
              name="seats"
              value={formData.seats.join(", ")}
              readOnly
              style={{ width: "100%", background: "#e9ecef" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Total Price:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              readOnly
              style={{ width: "100%" }}
            />
          </div>

          {/* Seat Selection Button */}
          <button type="button" onClick={goToSeatSelection} style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "10px"
          }}>
            Select Seat
          </button>

          <button type="submit" style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
