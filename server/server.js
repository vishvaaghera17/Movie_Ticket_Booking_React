const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));

// Routes
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const screenRoutes = require("./routes/screenRoutes");
const bookingRoutes = require("./routes/bookingRoutes"); // ✅ NEW

app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/screens", screenRoutes);
app.use("/api/bookings", bookingRoutes); // ✅ NEW

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
