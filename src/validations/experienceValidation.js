const Joi = require("joi");

const validateExperience = (data) => {
  const schema = Joi.object({
    company: Joi.string().min(2).max(100).required(),
    jobTitle: Joi.string().min(2).max(100).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref("startDate")).optional().allow(null),
    responsibilities: Joi.array().items(Joi.string()).min(1).required(),
    achievements: Joi.array().items(Joi.string()).optional(),
    skills: Joi.array().items(Joi.string()).optional(),
  });

  return schema.validate(data);
};

module.exports = {
  validateExperience,
};
