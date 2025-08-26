import Razorpay from "razorpay";
import crypto from "crypto";
import BookingSchema from "../models//BookingModal.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
export const makePayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating order");
  }
};

// Verify Payment & Store Booking
export const verifyPayment = async (req, res) => {
  try {
    const { userId, propertyId, startDate, endDate, amount, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
    const booking = new BookingSchema({
      user: userId,
      property: propertyId,
      startDate,
      endDate,
      totalAmount: amount,
      razorpay_order_id,
      razorpay_payment_id
    });

    await booking.save();

    res.json({ success: true, message: "Payment verified & booking stored successfully", booking });
  } catch (err) {
    console.error(err);
    res.status(500).send("Payment verification failed");
  }
};
