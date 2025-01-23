const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Missing access token" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid access token" });
    }

    const rootUser = await User.findById(verifyToken._id);
    if (!rootUser) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    req.rootUser = rootUser;
    req.userID = verifyToken._id;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { authenticateUser };
