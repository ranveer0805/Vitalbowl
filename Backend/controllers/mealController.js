const Meal = require("../models/Meal");

const mealController = {
  addMeal: async (req, res) => {
    try {
      const { io } = require("../app");
      const { type, food, description, fat, protein, carbs, calories, date } = req.body;
      if (!type || !food || fat == null || protein == null || carbs == null || calories == null || !date) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const meal = await Meal.create({
        type,
        food,
        description,
        fat,
        protein,
        carbs,
        calories,
        date,
        user: req.user,
      });

      // Emit real-time update to the user
      io.to(req.user.toString()).emit('mealAdded', meal);

      res.status(201).json(meal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getMeals: async (req, res) => {
    try {
      const meals = await Meal.find({ user: req.user }).sort({ date: -1 });
      res.json({ meals });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getMealById: async (req, res) => {
    try {
      const meal = await Meal.findOne({ _id: req.params.id, user: req.user });
      if (!meal) return res.status(404).json({ message: "Meal not found" });
      res.json(meal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateMeal: async (req, res) => {
    try {
      const meal = await Meal.findOneAndUpdate(
        { _id: req.params.id, user: req.user },
        req.body,
        { new: true }
      );
      if (!meal) return res.status(404).json({ message: "Meal not found" });
      res.json(meal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteMeal: async (req, res) => {
    try {
      const meal = await Meal.findOneAndDelete({ _id: req.params.id, user: req.user });
      if (!meal) return res.status(404).json({ message: "Meal not found" });
      res.json({ message: "Meal deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = mealController;
