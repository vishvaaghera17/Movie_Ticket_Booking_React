const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// POST /api/bookings
router.post("/", async (req, res) => {
  console.log("✅ Incoming booking request:", req.body); // Log the request body

  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    console.log("✅ Booking saved successfully:", savedBooking);
    res.status(201).json({ message: "Booking saved successfully", booking: savedBooking });
  } catch (error) {
    console.error("❌ Booking save error:", error); // Log full error
    res.status(500).json({ message: "Failed to save booking", error: error.message });
  }
});

module.exports = router;
