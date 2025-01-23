const experienceService = require("../services/experienceService");
const experienceValidation = require("../validations/experienceValidation");

const getAllExperiences = async (req, res) => {
  try {
    const experiences = await experienceService.getAllExperiences();
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createExperience = async (req, res) => {
  const { error } = experienceValidation.validateExperience(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newExperience = await experienceService.createExperience(req.body);
    res.status(201).json(newExperience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExperience = async (req, res) => {
  const { error } = experienceValidation.validateExperience(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const updatedExperience = await experienceService.updateExperience(
      req.params.id,
      req.body
    );
    if (!updatedExperience)
      return res.status(404).json({ message: "Experience not found" });
    res.status(200).json(updatedExperience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const deletedExperience = await experienceService.deleteExperience(
      req.params.id
    );
    if (!deletedExperience)
      return res.status(404).json({ message: "Experience not found" });
    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};
