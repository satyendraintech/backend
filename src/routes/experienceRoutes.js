const express = require("express");
const experienceController = require("../controllers/experienceController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/list", experienceController.getAllExperiences);
router.post(
  "/create",
  authenticateUser,
  authorize("admin", "create"),
  experienceController.createExperience
);
router.put(
  "/update/:id",
  authenticateUser,
  authorize("admin", "update"),
  experienceController.updateExperience
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authorize("admin", "delete"),
  experienceController.deleteExperience
);

module.exports = router;
