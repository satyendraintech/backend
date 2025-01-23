const contactService = require("../services/contactService");
const validateContact = require("../validations/contactValidation");

const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const { error } = validateContact({ name, email, message });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    await contactService.processContactMessage({ name, email, message });
    res
      .status(200)
      .json({ message: "Your message has been sent successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitContactForm,
};
