const express = require("express");
const usersController = require("../controllers/usersController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/profile", isAuthenticated, usersController.profile);
router.put("/change-password", isAuthenticated, usersController.changeUserPassword);
router.put("/update-profile", isAuthenticated, usersController.updateUserProfile);
router.put("/update-details", isAuthenticated, usersController.updateUserDetails);
router.put("/update-details-by-email", usersController.updateUserDetailsByEmail);
router.delete("/profile", isAuthenticated, usersController.deleteProfile);

module.exports = router;
