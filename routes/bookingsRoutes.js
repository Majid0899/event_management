const express = require("express");
const router= express.Router();
const {handleBookingTicket,handleGetBookings,handleCancelBooking}=require('../controllers/bookingController');
const {jwtAuthMiddleware}=require("../middlewares/jwt");

router.post("/ticket",jwtAuthMiddleware,handleBookingTicket);
router.get("/",jwtAuthMiddleware,handleGetBookings)
router.delete("/:id",jwtAuthMiddleware,handleCancelBooking)


module.exports = router;