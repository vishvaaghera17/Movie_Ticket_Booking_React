const express = require("express");
const Screen = require("../models/Screen");
const router = express.Router();

// GET screens showing a specific movie
router.get("/", async (req, res) => {
    const movie_id = parseInt(req.query.movie_id);
    const screens = await Screen.find({ movies: movie_id });
    res.json(screens);
  });
  
module.exports = router;
