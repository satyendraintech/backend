const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/User");
const config = require("../config/config");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const register = async ({ name, email, password, avatarUrl }) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }
    user = new User({ name, email, password, avatarUrl });
    await user.save();
    return { message: "User registered successfully" };
  } catch (err) {
    throw new Error(err.message);
  }
};

const login = async (email, password) => {
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, validUser.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    // Generate JWT token
    const payload = { _id: validUser._id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "2d" });

    // Return the token and user data
    const { password: hashedPassword, ...data } = validUser._doc;
    return {
      token,
      user: data,
      token_expiration: new Date(
        Date.now() + 2 * 24 * 60 * 60 * 1000
      ).toISOString(),
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
const updateProfile = async (userId, updateData) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Update user details
    if (updateData.name) user.name = updateData.name;
    if (updateData.email) user.email = updateData.email;

    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error updating profile: " + error.message);
  }
};
const updatePassword = async (userId, currentPassword, newPassword) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error("Current password is incorrect");

    // Update password
    user.password = newPassword;
    await user.save();
  } catch (error) {
    throw new Error("Error updating password: " + error.message);
  }
};

const generateResetToken = async (user) => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetToken = resetToken;
  user.resetTokenExpiration =
    Date.now() + parseInt(process.env.RESET_TOKEN_EXPIRATION, 10);
  await user.save();
  return resetToken;
};

const sendResetEmail = (email, resetToken) => {
  const resetUrl = `http://localhost:3033/auth/new-password/?token=${resetToken}`;
  const emailContent = `
  <p>Dear User,</p>
  
  <p>We received a request to reset your password. If you requested this change, please click the link below to create a new password:</p>
  
  <p><a href="${resetUrl}" style="color: #007BFF; text-decoration: none;">Reset Your Password</a></p>
  
  <p>If you did not request this change, you can safely ignore this email. Your password will not be changed.</p>
  
  <p>Thank you for using our services.</p>
  
  <p>Thanks & Regards,<br />
  The TechnicalBoy<br />
  
`;

  return transporter.sendMail({
    from: process.env.SMTP_USERNAME,
    to: email,
    subject: "Password Reset Request",
    html: emailContent,
  });
};
const verifyResetToken = async (token) => {
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error("Invalid or expired token");
  }

  return user;
};

const resetPassword = async (token, newPassword) => {
  const user = await verifyResetToken(token);
  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  await user.save();
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

module.exports = {
  register,
  login,
  updatePassword,
  updateProfile,
  generateResetToken,
  sendResetEmail,
  resetPassword,
  getUserById,
};
