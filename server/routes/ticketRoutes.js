const express = require("express");
const Ticket = require("../models/Ticket");

const router = express.Router();

// ✅ POST: Save ticket
router.post("/save-ticket", async (req, res) => {
  try {
    const { movie, screen, bookingData } = req.body;

    console.log("🎬 Incoming ticket data:", req.body); // 👈 add this log

    if (!movie || !bookingData) {
      return res.status(400).json({ message: "Missing ticket data" });
    }

    const ticket = new Ticket({
      movieTitle: movie.title,
      theaterName: screen?.name || "N/A",
      theaterLocation: screen?.location || "N/A",
      date: bookingData.date,
      seats: bookingData.seats,
      bookedBy: bookingData.name,
      totalPaid: bookingData.price,
    });

    await ticket.save();

    console.log("✅ Ticket saved:", ticket); // 👈 log confirmation

    res.status(201).json({ message: "🎟️ Ticket saved successfully!" });
  } catch (error) {
    console.error("❌ Error saving ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
