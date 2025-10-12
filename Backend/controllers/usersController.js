const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersController = {
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: "All fields required" });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

    const user = await User.create({ username, email, password: hashedPassword, detailsCompleted: false });
    const token = jwt.sign({ id: user._id }, "jorasiyaKey", { expiresIn: "3d" });

    res.status(201).json({ id: user._id, username: user.username, email: user.email, token });
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "jorasiyaKey", { expiresIn: "3d" });
    const response = {
      message: "Login success",
      token,
      id: user._id,
      username: user.username,
      email: user.email,
      detailsCompleted: user.detailsCompleted
    };
    if (user.detailsCompleted) {
      response.age = user.age;
      response.gender = user.gender;
      response.height = user.height;
      response.weight = user.weight;
      response.diet = user.diet;
    }
    res.json(response);
  }),

  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "No user found" });
    res.json({
      username: user.username,
      email: user.email,
      age: user.age,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      diet: user.diet,
      detailsCompleted: user.detailsCompleted
    });
  }),

  changeUserPassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "No user found" });

    user.password = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));
    await user.save({ validateBeforeSave: false });
    res.json({ message: "Password changed successfully" });
  }),

  updateUserProfile: asyncHandler(async (req, res) => {
    const { username, email, age, gender, height, weight, diet } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user, { username, email, age, gender, height, weight, diet }, { new: true });
    res.json({ message: "Profile updated", updatedUser });
  }),

  updateUserDetails: asyncHandler(async (req, res) => {
    const { age, gender, height, weight, diet } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user, { age, gender, height, weight, diet, detailsCompleted: true }, { new: true });
    res.json({ message: "User details updated successfully", updatedUser });
  }),

  updateUserDetailsByEmail: asyncHandler(async (req, res) => {
    const { email, age, gender, height, weight, diet } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    const updatedUser = await User.findOneAndUpdate({ email }, { age, gender, height, weight, diet, detailsCompleted: true }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User details updated successfully", updatedUser });
  }),

  deleteProfile: asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.user);
    res.json({ message: "Profile deleted successfully" });
  }),
};

module.exports = usersController;
