const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  movieTitle: { type: String, required: true },
  theaterName: String,
  theaterLocation: String,
  date: String,
  seats: [String],
  bookedBy: String,
  totalPaid: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ticket", ticketSchema);
