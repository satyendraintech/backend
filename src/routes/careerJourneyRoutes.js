const express = require("express");
const router = express.Router();
const careerJourneyController = require("../controllers/careerJourneyController");

// POST - Create new career journey experience
router.post("/create", careerJourneyController.createCareerJourney);

// GET - Get all career journey experiences
router.get("/list", careerJourneyController.getAllCareerJourneys);

module.exports = router;
