const express = require("express");
const app = express();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const bodyParser = require("body-parser");
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
const postController = require("../controllers/postController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post(
  "/create",
  authenticateUser,
  authorize("admin", "create"),
  postController.createPost
);
router.put(
  "/update/:postId",
  authenticateUser,
  authorize("admin", "update"),
  postController.updatePost
);
router.get("/list", postController.getPosts);
router.get("/details", postController.getPostByTitle);
router.get("/search", postController.searchPosts);
router.get("/latest", postController.getLatestPosts);
router.delete(
  "/delete/:postId",
  authenticateUser,
  authorize("admin", "delete"),
  postController.deletePost
);
router.post(
  `/fileupload`,
  upload.single("coverUrl"),
  postController.fileUploadController
);

module.exports = router;
