const express = require("express");
const Movie = require("../models/Movie");
const router = express.Router();

// GET all movies
router.get("/", async (req, res) => {
    const movies = await Movie.find({});
    res.json(movies);
  });
  
  // GET single movie by movie_id
  router.get("/:movie_id", async (req, res) => {
    const movie_id = parseInt(req.params.movie_id);
    const movie = await Movie.findOne({ movie_id });
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  });
  

module.exports = router;
