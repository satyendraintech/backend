const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    total: {
      type: Number,
      required: [true, "Total is required"],
      min: [0, "Total must be a positive number"],
    },
    color: {
      type: String,
      required: [true, "Color is required"],
    },
    icon: {
      type: String,
      required: [true, "Icon is required"],
    },
  },
  {
    timestamps: true,
  }
);

const WorkExperience = mongoose.model("WorkExperience", experienceSchema);

// Export the model
module.exports = WorkExperience;
