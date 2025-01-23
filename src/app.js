const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to database
connectDB();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3032",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

// Basic Route
app.get("/", (req, res) => res.send("API is running"));

// Routes
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const contactRoutes = require("./routes/contactRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const smsRoutes = require("./routes/smsRoutes"); // Use the new smsRoutes
const workExperience = require("./routes/workRoutes");
const careerJourney = require("./routes/careerJourneyRoutes");

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api", contactRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/sms", smsRoutes);
app.use("/api/work", workExperience);
app.use("/api/career-journey", careerJourney);

module.exports = app;
