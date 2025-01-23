const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(10).max(1000).required(),
});

const validateContact = (data) => {
  return contactSchema.validate(data);
};

module.exports = validateContact;
