const Comment = require("../models/comment");
const Post = require("../models/Post");

// Service to add a comment
const createComment = async (postId, userId, message, emojis) => {
  try {
    const postExists = await Post.findById(postId);
    if (!postExists) {
      throw new Error("Post not found");
    }
    const newComment = new Comment({
      post: postId,
      user: userId,
      message,
      emojis,
    });

    const savedComment = await newComment.save();

    // Update the post with the new comment
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: savedComment._id },
      $inc: { totalComments: 1 },
    });

    return savedComment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to add a reply to a comment
const createReply = async (commentId, userId, message, emojis) => {
  try {
    const commentExists = await Comment.findById(commentId);
    if (!commentExists) {
      throw new Error("Comment not found");
    }
    const addReplyComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $push: { replyComment: { user: userId, message, emojis } },
      },
      { new: true }
    );

    return addReplyComment;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCommentsForPost = async (postId) => {
  try {
    return await Comment.find({ post: postId })
      .populate("user", "name")
      .populate({
        path: "replyComment.user",
        select: "name",
      })
      .exec();
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateComment = async (commentId, userId, message, emojis) => {
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }
    if (comment.user.toString() !== userId.toString()) {
      throw new Error("You do not have permission to update this comment");
    }
    comment.message = message;
    comment.emojis = emojis;
    comment.updatedAt = Date.now();
    const updatedComment = await comment.save();
    return updatedComment;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteComment = async (commentId) => {
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }
    await Comment.findByIdAndDelete(commentId);
    const post = await Post.findOne({ comments: commentId });
    if (post) {
      await Post.findByIdAndUpdate(post._id, {
        $pull: { comments: commentId },
        $inc: { totalComments: -1 },
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createComment,
  createReply,
  getCommentsForPost,
  updateComment,
  deleteComment,
};
