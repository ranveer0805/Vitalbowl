// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const errorHandler = require("./middlewares/errorHandlerMiddleware");

const goalRoutes = require("./routes/goal");
const mealRoutes = require("./routes/meal");
const userRoutes = require("./routes/user");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

const FRONTEND_URL = process.env.FRONTEND_URL || "https://vitalbowl.vercel.app";

// ===== CORS =====
const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight requests

app.use(express.json());

// ===== Socket.io =====
const io = socketIo(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// ===== Routes =====
app.use("/api/goals", goalRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/users", userRoutes);

// ===== Error Handler =====
app.use(errorHandler);

// ===== MongoDB Connection & Server Start =====
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/vitalbowl";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const db = mongoose.connection.db;
    db.collection("goals").dropIndex("user_1")
      .then(() => console.log("Unique index on user dropped successfully"))
      .catch(err => console.log("Index drop info:", err.message || "No such index or already dropped"));

    server.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));

module.exports = { io };
