const Posts = require("../models/Post");
const cloudinary = require("cloudinary").v2;
const generateNumericId = require("../utils/generateNumericId");
const { originalFormat } = require("../utils/postNameFormate");

const uploadFileToCloudinary = async (file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  const numericId = await generateNumericId();
  const generatedId = `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${numericId}`;
  const base64String = file.buffer.toString("base64");

  try {
    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${base64String}`,
      {
        folder: "blogs-images",
        public_id: generatedId,
      }
    );
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Error uploading image to Cloudinary");
  }
};

const createPost = async (postData, userId) => {
  try {
    const {
      publish,
      metaKeywords,
      title,
      description,
      content,
      coverUrl,
      tags,
      metaTitle,
      metaDescription,
      comments = [],
    } = postData;

    // Validate required fields
    if (
      !publish ||
      !title ||
      !description ||
      !content ||
      !coverUrl ||
      tags.length < 2 ||
      !metaTitle ||
      !metaDescription
    ) {
      throw new Error("Please fill in all required fields");
    }

    // Check if a post with the same title already exists
    const existingPost = await Posts.findOne({ title });
    if (existingPost) {
      throw new Error("A post with this title already exists");
    }

    // Create and save the new post
    const newPost = new Posts({
      publish,
      title,
      description,
      content,
      coverUrl: coverUrl.preview,
      // coverUrl,
      tags,
      metaKeywords,
      metaTitle,
      metaDescription,
      comments,
      author: userId,
    });

    await newPost.save();
    return newPost;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getPosts = async () => {
  return await Posts.find();
};

const getPostByTitle = async (title) => {
  // const post = await Posts.findOne({ title });
  const decodedTitle = originalFormat(title);
  const post = await Posts.findOne({
    title: new RegExp("^" + decodedTitle + "$", "i"),
  });
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};

const updatePost = async (postId, postData) => {
  const post = await Posts.findByIdAndUpdate(postId, postData, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};

const deletePost = async (postId) => {
  const post = await Posts.findByIdAndDelete(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};

const searchPosts = async (query) => {
  return await Posts.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
      { tags: { $regex: query, $options: "i" } },
    ],
  });
};

const getLatestPosts = async () => {
  return await Posts.find().sort({ createdAt: -1 }).limit(5);
};

module.exports = {
  createPost,
  getPosts,
  getPostByTitle,
  updatePost,
  deletePost,
  searchPosts,
  getLatestPosts,
  uploadFileToCloudinary,
};
