import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData, movie, screen } = location.state || {};

  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ Navigate to BookingConfirm page
    navigate("/bookingconfirm", {
      state: { bookingData, movie, screen },
    });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "url('/i.jpg') center/cover no-repeat",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          padding: "40px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0px 5px 20px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Payment</h2>
        <h3 style={{ margin: "10px 0", fontSize: "1.2em", fontWeight: "bold" }}>{movie.title}</h3>
        {/* ✅ Display total price */}
        <h3 style={{ color: "#28a745", marginBottom: "20px" }}>
          Amount to Pay: ₹{bookingData?.price || 0}
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="cardName"
            placeholder="Card Holder Name"
            value={formData.cardName}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            maxLength="16"
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={formData.expiry}
            onChange={handleChange}
            required
            maxLength="5"
            style={{
              width: "48%",
              padding: "10px",
              margin: "10px 2% 10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="password"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
            required
            maxLength="3"
            style={{
              width: "48%",
              padding: "10px",
              margin: "10px 0 10px 2%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "15px",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
