const express = require("express");
const router = express.Router();
const workController = require("../controllers/workController");

router.post("/create", workController.workExperienceCreate);
router.get("/list", workController.workExperienceList);
router.delete("/delete/:id", workController.workExperienceDelete);
router.put("/update/:id", workController.workExperienceUpdate);

module.exports = router;
