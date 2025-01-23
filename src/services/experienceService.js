const Experience = require("../models/Experience");

const getAllExperiences = async () => {
  return await Experience.find();
};

const createExperience = async (experienceData) => {
  const existingExperience = await Experience.findOne({
    company: experienceData.company,
    jobTitle: experienceData.jobTitle,
  });

  if (existingExperience) {
    throw new Error(
      "Experience with the same company and job title already exists"
    );
  }
  const experience = new Experience(experienceData);
  return await experience.save();
};

const updateExperience = async (id, experienceData) => {
  return await Experience.findByIdAndUpdate(id, experienceData, { new: true });
};

const deleteExperience = async (id) => {
  return await Experience.findByIdAndDelete(id);
};

module.exports = {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};
