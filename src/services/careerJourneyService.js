const CareerJourney = require("../models/careerJourney");

const createCareerJourney = async (requestData) => {
  try {
    const {
      title,
      name,
      logo,
      icon,
      priorexperience,
      level,
      location,
      workDuration,
    } = requestData;
    if (
      !title ||
      !name ||
      !logo ||
      !icon ||
      !priorexperience ||
      !level ||
      !location ||
      !workDuration
    ) {
      throw new Error("Please fill in all the fields properly.");
    }
    const existingExperience = await CareerJourney.findOne({
      title,
      name,
    });
    if (existingExperience) {
      throw new Error("Similar work experience already exists.");
    }
    const newJourney = await CareerJourney.create(requestData);
    return newJourney;
  } catch (error) {
    throw error;
  }
};

const getAllCareerJourneys = async () => {
  try {
    const experiences = await CareerJourney.find();
    return experiences;
  } catch (error) {
    throw error;
  }
};

module.exports = { createCareerJourney, getAllCareerJourneys };
