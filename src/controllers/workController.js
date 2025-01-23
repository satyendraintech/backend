const workService = require("../services/workService");

const workExperienceCreate = async (req, res) => {
  try {
    const { title, total, color, icon } = req.body;

    if (!title || !total || !color || !icon) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newExperience = await workService.createExperience({
      title,
      total,
      color,
      icon,
    });

    res.status(201).json({
      message: "Experience created successfully.",
      experiencedata: newExperience,
    });
  } catch (error) {
    console.error("Error creating work experience:", error);
    res.status(500).json({ error: error.message });
  }
};

const workExperienceList = async (req, res) => {
  try {
    const experiencedata = await workService.getExperiences();
    res.json({ experiencedata });
  } catch (error) {
    console.error("Error fetching work experiences:", error);
    res.status(500).json({ error: error.message });
  }
};

const workExperienceDelete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID parameter is required." });
    }

    const deletedExperience = await workService.deleteExperience(id);

    res.json({
      message: "Experience deleted successfully.",
      deletedExperience,
    });
  } catch (error) {
    console.error("Error deleting work experience:", error);
    res.status(500).json({ error: error.message });
  }
};

const workExperienceUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID parameter is required." });
    }

    const updatedExperience = await workService.updateExperience(id, newData);

    res.json({
      message: "Experience updated successfully.",
      updatedExperience,
    });
  } catch (error) {
    console.error("Error updating work experience:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  workExperienceCreate,
  workExperienceList,
  workExperienceDelete,
  workExperienceUpdate,
};
