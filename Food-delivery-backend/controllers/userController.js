const User = require("../models/User");

exports.addToCart = async (req, res) => {
  const { foodId, name, price } = req.body;

  const user = await User.findById(req.user.id);

  const item = user.cart.find(i => i.foodId === foodId);

  if (item) {
    item.quantity += 1;
  } else {
    user.cart.push({ foodId, name, price, quantity: 1 });
  }

  await user.save();

  res.json(user.cart);
};