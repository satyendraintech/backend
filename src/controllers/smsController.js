// controllers/smsController.js
const smsService = require("../services/smsService");
const { MessagingResponse } = require("twilio").twiml;

// Controller to send SMS
const sendSms = async (req, res) => {
  const { to, message } = req.body;

  try {
    const sms = await smsService.sendSms(to, message);
    res
      .status(200)
      .json({ message: "Message sent successfully!", smsSid: sms.sid });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send message", error: error.message });
  }
};

const handleIncomingSms = (req, res) => {
  const { From, Body } = req.body;
  const twiml = new MessagingResponse();

  // Custom response logic
  twiml.message("Thank you for your message! We will get back to you soon.");

  res.type("text/xml");
  res.send(twiml.toString());
};

module.exports = { sendSms, handleIncomingSms };
