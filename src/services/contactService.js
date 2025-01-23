const Contact = require("../models/Contact");

const processContactMessage = async ({ name, email, message }) => {
  try {
    const contactMessage = new Contact({ name, email, message });
    return await contactMessage.save();
  } catch (error) {
    throw new Error("Error saving contact message: " + error.message);
  }
};

module.exports = {
  processContactMessage,
};
