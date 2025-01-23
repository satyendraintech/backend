const mongoose = require("mongoose");

const careerJourneySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    logo: { type: String, required: true },
    icon: { type: String, required: true },
    priorexperience: { type: String, required: true },
    level: { type: String, required: true },
    location: { type: String, required: true },
    workDuration: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CareerJourney = mongoose.model("CareerJourney", careerJourneySchema);

module.exports = CareerJourney;
