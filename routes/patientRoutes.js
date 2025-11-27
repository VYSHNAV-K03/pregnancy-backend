const express = require("express");
const User = require("../models/userModel");
const PatientHealth = require("../models/PatientHealth");
const PatientDailyData = require("../models/PatientDailyData");
const PatientTip = require("../models/PatientTip");
const ContactMessage = require("../models/ContactMessage");
const router = express.Router();

// Get patient profile by patient token ID
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user || user.role !== "patient") {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get patient health records
router.get("/health/:id", async (req, res) => {
  try {
    const health = await PatientHealth.find({ patientId: req.params.id }).sort({
      createdAt: -1,
    });

    res.json(health);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE daily data
router.post("/daily/:id", async (req, res) => {
  try {
    const record = new PatientDailyData({
      patientId: req.params.id,
      ...req.body,
    });

    await record.save();
    res.status(201).json({ message: "Daily data saved", record });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET all daily data for a patient
router.get("/daily/:id", async (req, res) => {
  try {
    const records = await PatientDailyData.find({
      patientId: req.params.id,
    }).sort({ createdAt: -1 });

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id/tips", async (req, res) => {
  try {
    const tips = await PatientTip.find({ patientId: req.params.id }).sort({
      createdAt: -1,
    });
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/contact", async (req, res) => {
  try {
    const { patientId, name, email, subject, message } = req.body;

    if (!patientId) {
      return res.status(400).json({ error: "Patient not authenticated" });
    }

    const newMessage = new ContactMessage({
      patientId,
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

module.exports = router;
