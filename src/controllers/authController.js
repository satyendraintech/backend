const authService = require("../services/authService");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { name, email, password, avatarUrl } = req.body;

  try {
    const result = await authService.register({
      name,
      email,
      password,
      avatarUrl,
    });
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res
      .cookie("accessToken", result.token, {
        httpOnly: true, // Ensures the cookie is inaccessible via client-side scripts
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
        sameSite: "strict", // Ensures the cookie is sent only with same-site requests (adjust based on requirements)
        path: "/", // Cookie is available to all paths
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        accessToken: result.token,
        user: result.user,
        token_expiration: result.token_expiration,
        message: "Successfully logged in",
      });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const userId = req.rootUser._id; // Extract user ID from authenticated session

  try {
    const result = await authService.updateProfile(userId, { name, email });
    res.status(200).json({
      message: "Profile updated successfully",
      user: result,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.rootUser._id; // Extract user ID from authenticated session

  try {
    await authService.updatePassword(userId, currentPassword, newPassword);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: err.message });
  }
};

exports.logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Successfully logged out" });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ msg: "User with that email does not exist" });
    }
    const resetToken = await authService.generateResetToken(user);
    await authService.sendResetEmail(email, resetToken);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    await authService.resetPassword(token, newPassword);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await authService.getUserById(req.rootUser._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userData } = user._doc;
    res.json({ user: userData });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
