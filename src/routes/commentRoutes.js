const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/add", authenticateUser, commentController.addComment);
router.post("/reply", authenticateUser, commentController.addReply);
router.get("/list/:postId", authenticateUser, commentController.getComments);
router.delete(
  "/delete/:commentId",
  authenticateUser,
  authorize("admin", "delete"),
  commentController.deleteComment
);
router.put(
  "/update/:commentId",
  authenticateUser,
  commentController.updateComment
);

module.exports = router;
