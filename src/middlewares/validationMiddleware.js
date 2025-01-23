const {
  registerSchema,
  loginSchema,
  updateProfileValidation,
  updatePasswordValidation,
} = require("../validations/userValidation");

const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  next();
};

// Middleware to validate request body
const validateUpdateProfile = (req, res, next) => {
  const { error } = updateProfileValidation.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });
  next();
};

const validateUpdatePassword = (req, res, next) => {
  const { error } = updatePasswordValidation.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });
  next();
};
module.exports = {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateUpdatePassword,
};
