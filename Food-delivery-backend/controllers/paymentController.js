const razorpay = require("../config/razorpay");
const crypto = require("crypto");

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    // Mock Razorpay order response
    const mockOrder = {
      id: `order_mock_${Date.now()}`,
      entity: "order",
      amount: amount,
      amount_paid: 0,
      amount_due: amount,
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
      status: "created",
      attempts: 0,
      created_at: Math.floor(Date.now() / 1000)
    };

    console.log("Mock Razorpay order created:", mockOrder);
    res.json(mockOrder);
  } catch (err) {
    console.error("Payment order creation error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Mock payment verification - always success for testing
    console.log("Mock payment verification:", {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    });

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({ message: err.message });
  }
};