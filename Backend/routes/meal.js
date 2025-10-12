// const express = require("express");
// const router = express.Router();
// const isAuthenticated = require("../middlewares/isAuthenticated");
// const Meal = require("../models/Meal");

// // Add Meal
// router.post("/", isAuthenticated, async (req, res) => {
//   try {
//     const { name, calories, date } = req.body;
//     const meal = await Meal.create({
//       name,
//       calories,
//       date,
//       user: req.user,
//     });
//     res.status(201).json(meal);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Get all Meals for a user
// router.get("/", isAuthenticated, async (req, res) => {
//   const meals = await Meal.find({ user: req.user }).sort({ date: -1 });
//   res.json(meals);
// });

// // Update Meal
// router.put("/:id", isAuthenticated, async (req, res) => {
//   try {
//     const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(meal);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Get single Meal
// router.get("/:id", isAuthenticated, async (req, res) => {
//   try {
//     const meal = await Meal.findById(req.params.id);
//     res.status(200).json(meal);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Delete Meal
// router.delete("/:id", isAuthenticated, async (req, res) => {
//   try {
//     await Meal.findByIdAndDelete(req.params.id);
//     res.json({ message: "Meal deleted successfully" });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const mealController = require("../controllers/mealController");

router.post("/", isAuthenticated, mealController.addMeal);
router.get("/", isAuthenticated, mealController.getMeals);
router.get("/:id", isAuthenticated, mealController.getMealById);
router.put("/:id", isAuthenticated, mealController.updateMeal);
router.delete("/:id", isAuthenticated, mealController.deleteMeal);

module.exports = router;
