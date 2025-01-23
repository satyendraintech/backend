const roles = require("../config/roles");

const authorize = (requiredRole, requiredAction) => {
  return (req, res, next) => {
    try {
      const userRole = req.rootUser.role;
      if (!userRole) {
        return res
          .status(403)
          .json({ message: "Unauthorized: User role not found" });
      }
      if (userRole !== requiredRole) {
        return res
          .status(403)
          .json({ message: `Forbidden: ${requiredRole} access required.` });
      }
      if (roles[userRole] && roles[userRole].includes(requiredAction)) {
        next();
      } else {
        return res.status(403).json({
          message: "Forbidden: You do not have access to this resource.",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

module.exports = authorize;
