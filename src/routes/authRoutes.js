const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authMiddleware");
const authController = require("../controllers/authController");
const authorize = require("../middlewares/roleMiddleware");

const {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateUpdatePassword,
} = require("../middlewares/validationMiddleware");

// Example route
router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.put(
  "/updateProfile",
  authenticateUser,
  authorize("user", "update"),
  validateUpdateProfile,
  authController.updateProfile
);
router.put(
  "/updatePassword",
  authenticateUser,
  authorize("user", "update"),
  validateUpdatePassword,
  authController.updatePassword
);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/logout", authController.logout);
router.get("/me", authenticateUser, authController.getMe);

module.exports = router;
