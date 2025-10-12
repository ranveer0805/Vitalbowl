const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const errorHandler = require("./middlewares/errorHandlerMiddleware");

const goalRoutes = require("./routes/goal");
const mealRoutes = require("./routes/meal");
const userRoutes = require("./routes/user");

require("dotenv").config(); // load .env variables

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "https://vitalbowl.vercel.app",
    methods: ["GET", "POST"]
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "https://vitalbowl.vercel.app" }));
app.use(express.json());

// Routes
app.use("/api/goals", goalRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/users", userRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/vitalbowl";

// Connect to MongoDB Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected");
    // Drop the unique index on user field in goals collection to allow multiple goals per user
    const db = mongoose.connection.db;
    db.collection('goals').dropIndex('user_1')
      .then(() => console.log("Unique index on user dropped successfully"))
      .catch(err => console.log("Index drop info:", err.message || "No such index or already dropped"));
    server.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = { io };

