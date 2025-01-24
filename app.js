const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const connectDB = require("./src/config/db");

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
const authRoutes = require("./src/routes/authRoutes");
const protectedRoutes = require("./src/routes/protectedRoutes");
const postRoutes = require("./src/routes/postRoutes");
const commentRoutes = require("./src/routes/commentRoutes");
const contactRoutes = require("./src/routes/contactRoutes");
const experienceRoutes = require("./src/routes/experienceRoutes");
const smsRoutes = require("./src/routes/smsRoutes"); // Use the new smsRoutes
const workExperience = require("./src/routes/workRoutes");
const careerJourney = require("./src/routes/careerJourneyRoutes");

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api", contactRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/sms", smsRoutes);
app.use("/api/work", workExperience);
app.use("/api/career-journey", careerJourney);

// Server configuration
const config = require("./src/config/config");
const PORT = config.port;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
