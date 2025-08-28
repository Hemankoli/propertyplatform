const express = require("express");
const router = express.Router();
const bookingController= require("../controllers/bookingController");

router.post("/make-payment", bookingController.makePayment);
router.post("/verify-payment", bookingController.verifyPayment);
router.get("/all-bookings", bookingController.getBookings);
router.get("/booking/:userId", bookingController.getBookingById);

module.exports = router;                                                                                                                                    