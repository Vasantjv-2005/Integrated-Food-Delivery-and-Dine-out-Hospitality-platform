const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ message: "No token" });

  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 fetch full user (IMPORTANT FOR ADMIN)
    const user = await User.findById(decoded.id).select("-password");

    req.user = user;

    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};