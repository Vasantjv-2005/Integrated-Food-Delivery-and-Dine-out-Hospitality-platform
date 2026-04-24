const Cart = require("../models/Cart");

// ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    cart.items.push(req.body);
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// GET CART
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REMOVE ITEM
exports.removeItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    cart.items.splice(req.params.index, 1);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};