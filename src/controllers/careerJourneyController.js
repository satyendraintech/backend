const careerJourneyService = require("../services/careerJourneyService");

const createCareerJourney = async (req, res) => {
  try {
    const newJourney = await careerJourneyService.createCareerJourney(req.body);
    res.status(201).json({ newJourney });
  } catch (error) {
    console.error(error);
    if (error.message === "Please fill in all the fields properly.") {
      res.status(422).json({ error: error.message });
    } else if (error.message === "Similar work experience already exists.") {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
};

const getAllCareerJourneys = async (req, res) => {
  try {
    const experiences = await careerJourneyService.getAllCareerJourneys();
    res.json({ experiences });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { createCareerJourney, getAllCareerJourneys };
