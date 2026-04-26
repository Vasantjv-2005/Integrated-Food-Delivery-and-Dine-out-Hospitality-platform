const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  foodId: String,
  name: String,
  price: Number,
  quantity: Number,
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    cart: [cartSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);