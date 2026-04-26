const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        name: String,
        price: Number,
        qty: Number,
      },
    ],
    totalPrice: Number,
    address: String,
    status: {
      type: String,
      default: "Placed",
      enum: ["Placed", "Preparing", "Out for Delivery", "Delivered"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);