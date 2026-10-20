const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  seats: { type: [String], required: true },
  price: { type: Number, required: true },
  movieTitle: { type: String, required: true },
  genre: { type: String },
  releaseDate: { type: String },
  theaterName: { type: String },
  location: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
