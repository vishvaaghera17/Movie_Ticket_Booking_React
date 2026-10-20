import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import MovieDetails from "./MovieDetails";
import Booking from "./Booking";
import SeatSelection from "./SeatSelection";
import Payment from "./Payment"; // import Payment page
import BookingConfirm from "./BookingConfirm";
import Ticket from "./Ticket";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:movie_id" element={<MovieDetails />} />
        <Route path="/booking/:movie_id/:screen_id" element={<Booking />} />
        <Route path="/seatselection" element={<SeatSelection />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/bookingconfirm" element={<BookingConfirm />} />
        <Route path="/ticket" element={<Ticket />} />
      
      </Routes>
    </Router>
  );
}

export default App;
