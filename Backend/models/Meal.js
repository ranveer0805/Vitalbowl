const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Brunch", "Morning Snack", "Evening Snack"],
      required: true,
    },
    food: { type: String, required: true },
    description: { type: String, required: false },
    fat: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meal", mealSchema);
