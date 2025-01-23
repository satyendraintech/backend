const postService = require("../services/postService");

exports.fileUploadController = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const imageUrl = await postService.uploadFileToCloudinary(file);
    res.status(200).json({ success: true, imageUrl });
  } catch (error) {
    console.error("Error in fileUploadController:", error);

    if (error.message === "No file provided") {
      return res.status(400).json({ error: "No file provided" });
    }

    if (error.message === "Error uploading image to Cloudinary") {
      return res
        .status(500)
        .json({ error: "Failed to upload file to Cloudinary" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createPost = async (req, res) => {
  try {
    if (req.rootUser.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized: Admin access required" });
    }
    const post = await postService.createPost(req.body, req.rootUser._id);
    res.status(201).json({ message: "Post created successfully", post });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    res.status(200).json({ posts });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getPostByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const post = await postService.getPostByTitle(title);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.postId, req.body);
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await postService.deletePost(req.params.postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.searchPosts = async (req, res) => {
  try {
    const results = await postService.searchPosts(req.query.query);
    res.status(200).json({ results });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getLatestPosts = async (req, res) => {
  try {
    const latestPosts = await postService.getLatestPosts();
    res.status(200).json({ latestPosts });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
