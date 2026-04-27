const Order = require("../models/Order");
const Cart = require("../models/Cart");

// PLACE ORDER
exports.placeOrder = async (req, res) => {
  try {
    // Check if items are sent directly from frontend
    const { items, address, totalPrice } = req.body;
    
    // If items are sent directly (from frontend cart)
    if (items && items.length > 0) {
      const order = await Order.create({
        user: req.user.id,
        items: items,
        totalPrice: totalPrice || items.reduce((acc, item) => acc + item.price * item.qty, 0),
        address: address,
      });
      return res.json(order);
    }
    
    // Otherwise, try to get from cart (original logic)
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // calculate total
    const total = cart.items.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    const order = await Order.create({
      user: req.user.id,
      items: cart.items,
      totalPrice: total,
      address: req.body.address,
    });

    // clear cart
    cart.items = [];
    await cart.save();

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// GET USER ORDERS
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔄 UPDATE ORDER STATUS (WITH SOCKET.IO)
exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status;
    await order.save();

    // 🔥 REAL-TIME UPDATE
    const io = req.app.get("io");
    io.to(order._id.toString()).emit("orderUpdated", order);

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};