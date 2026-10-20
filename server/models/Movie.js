const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movie_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  genre: { type: String, required: true },
  release_date: { type: String, required: true },
  status: { type: String, required: true },
  poster: { type: String, required: true }
});

module.exports = mongoose.model("Movie", movieSchema);
