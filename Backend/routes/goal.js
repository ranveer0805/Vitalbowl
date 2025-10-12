const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const goalController = require("../controllers/goalController");

router.post("/", isAuthenticated, goalController.create);
router.get("/", isAuthenticated, goalController.lists);
router.get("/:id", isAuthenticated, goalController.getById);
router.put("/:id", isAuthenticated, goalController.update);
router.put("/status/:id", isAuthenticated, goalController.updateStatus);
router.delete("/:id", isAuthenticated, goalController.delete);

module.exports = router;
