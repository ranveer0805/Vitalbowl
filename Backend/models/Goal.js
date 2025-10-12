// // backend/models/Goal.js
// const mongoose = require("mongoose");

// const goalSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String },
//     duration: { type: String, required: true },
//     status: { type: String, enum: ["Ongoing", "Completed", "Failed"], default: "Ongoing" },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Goal", goalSchema);


const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: String, required: true },
    status: { type: String, enum: ["Ongoing", "Completed", "Failed"], default: "Ongoing" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
