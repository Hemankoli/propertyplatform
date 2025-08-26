const express = require("express");
const router = express.Router();
const { verifyPayment, makePayment } = require("../controllers/bookingController");

router.post("/make-payment", makePayment);
router.post("/verify-payment", verifyPayment);

module.exports = router;                                                                                                                                            