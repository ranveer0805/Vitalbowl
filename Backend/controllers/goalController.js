// backend/controllers/goalController.js 
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Goal = require("../models/Goal");

const goalController = {
  create: asyncHandler(async (req, res) => {
    const { title, description, duration } = req.body;
    if (!title || !duration) return res.status(400).json({ message: "Title and duration are required" });
    if (!mongoose.Types.ObjectId.isValid(req.user)) return res.status(400).json({ message: "Invalid user id" });
    const goal = await Goal.create({ title, description, duration, user: req.user });
    res.status(201).json(goal);
  }),

  lists: asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(goals);
  }),

  getById: asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal || goal.user.toString() !== req.user.toString()) return res.status(404).json({ message: "Goal not found" });
    res.json(goal);
  }),

  update: asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal || goal.user.toString() !== req.user.toString()) return res.status(403).json({ message: "Unauthorized" });
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedGoal);
  }),

  updateStatus: asyncHandler(async (req, res) => {
    const goal = await Goal.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(goal);
  }),

  delete: asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal || goal.user.toString() !== req.user.toString()) return res.status(403).json({ message: "Unauthorized" });
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: "Goal deleted" });
  }),
};

module.exports = goalController;
