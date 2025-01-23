const WorkExperience = require("../models/work");

const createExperience = async ({ title, total, color, icon }) => {
  const newExperience = new WorkExperience({ title, total, color, icon });
  try {
    const savedExperience = await newExperience.save();
    return savedExperience;
  } catch (error) {
    throw new Error("Failed to create work experience: " + error.message);
  }
};

const getExperiences = async () => {
  try {
    const customOrder = [
      "Years Experience",
      "Companies Work",
      "Completed Projects",
      "Personal Project",
    ];
    const experiences = await WorkExperience.find({
      title: { $in: customOrder },
    });

    const sortedExperienceData = customOrder.map((title) =>
      experiences.find((data) => data.title === title)
    );

    return sortedExperienceData;
  } catch (error) {
    throw new Error("Failed to fetch work experiences: " + error.message);
  }
};

const deleteExperience = async (id) => {
  try {
    const deletedExperience = await WorkExperience.findByIdAndDelete(id);
    if (!deletedExperience) {
      throw new Error("Experience not found.");
    }
    return deletedExperience;
  } catch (error) {
    throw new Error("Failed to delete work experience: " + error.message);
  }
};

const updateExperience = async (id, newData) => {
  try {
    const updatedExperience = await WorkExperience.findByIdAndUpdate(
      id,
      newData,
      { new: true, runValidators: true }
    );
    if (!updatedExperience) {
      throw new Error("Experience not found.");
    }
    return updatedExperience;
  } catch (error) {
    throw new Error("Failed to update work experience: " + error.message);
  }
};

module.exports = {
  createExperience,
  getExperiences,
  deleteExperience,
  updateExperience,
};
