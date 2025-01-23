const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// Example of a protected route
router.get(
  "/admin",
  authenticateUser,
  authorize("admin", "read"),
  (req, res) => {
    res.send("Welcome Admin");
  }
);

// Another protected route
router.get("/profile", authenticateUser, (req, res) => {
  res.json(req.rootUser);
});

module.exports = router;
