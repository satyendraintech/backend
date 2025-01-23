const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    publish: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    metaKeywords: [String],
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    content: String,
    coverUrl: {
      type: String,
      required: true,
    },
    tags: [String],
    metaTitle: String,
    metaDescription: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    totalViews: {
      type: Number,
      default: 0,
    },
    totalShares: {
      type: Number,
      default: 0,
    },
    totalComments: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
