const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ================= ROUTES =================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));

// Root route
app.get("/", (req, res) => {
  res.send("API running...");
});

// ================= SOCKET.IO =================

// 🔥 create server FIRST
const server = http.createServer(app);

// 🔥 init socket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// 🔥 socket connection
io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  // join order room
  socket.on("joinOrder", (orderId) => {
    socket.join(orderId);
    console.log(`📦 Joined room: ${orderId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// 🔥 make io global (IMPORTANT)
app.set("io", io);

// ================= SERVER START =================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});