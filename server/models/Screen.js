const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema({
  screen_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  screen_img: { type: String, required: true },
  movies: [{ type: Number }]
});

module.exports = mongoose.model("Screen", screenSchema);
