require("dotenv").config();
const twilio = require("twilio");

// Replace with your Twilio Account SID and Auth Token
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Must start with "AC"
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Check if the environment variables are loaded correctly
if (!accountSid || !authToken) {
  throw new Error("Twilio credentials are not set in environment variables.");
}

const client = new twilio(accountSid, authToken);

// Service to send SMS
exports.sendSms = async (to, message) => {
  try {
    if (!to || !message) {
      throw new Error("Recipient phone number and message body are required.");
    }
    const sms = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: to, // Recipient's phone number
    });
    return sms;
  } catch (error) {
    throw new Error(`Failed to send SMS: ${error.message}`);
  }
};
