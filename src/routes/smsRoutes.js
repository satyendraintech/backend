// routes/smsRoutes.js
const express = require("express");
const router = express.Router();
const smsController = require("../controllers/smsController");

// Route to send SMS
router.post("/send-sms", smsController.sendSms);
router.post("/incoming-sms", smsController.handleIncomingSms);

module.exports = router;
