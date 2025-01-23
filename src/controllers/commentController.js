const commentService = require("../services/commentService");

// Add a comment to a post
const addComment = async (req, res) => {
  try {
    const { postId, message, emojis } = req.body;
    const userId = req.rootUser._id;

    if (!postId || !userId || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const savedComment = await commentService.createComment(
      postId,
      userId,
      message,
      emojis
    );

    res.status(201).json({ savedComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a reply to a comment
const addReply = async (req, res) => {
  try {
    const { commentId, message, emojis } = req.body;
    const userId = req.rootUser._id;

    if (!commentId || !userId || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const addReply = await commentService.createReply(
      commentId,
      userId,
      message,
      emojis
    );

    res.status(200).json({ addReply });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all comments for a post
const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const commentList = await commentService.getCommentsForPost(postId);
    res.status(200).json({ commentList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await commentService.deleteComment(commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { message, emojis } = req.body;
    const userId = req.rootUser._id;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const updatedComment = await commentService.updateComment(
      commentId,
      userId,
      message,
      emojis
    );

    res.status(200).json({ updatedComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addComment,
  addReply,
  getComments,
  deleteComment,
  updateComment,
};
