const express = require("express");
const User = require("../models/userModel");
const PatientHealth = require("../models/PatientHealth");
const router = express.Router();
const bcrypt = require("bcryptjs");
const PatientDailyData = require("../models/PatientDailyData");
const PatientTip = require("../models/PatientTip");

router.get("/patients", async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" });
    res.status(200).json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/patient/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/register/patient", async (req, res) => {
  const { username, email, password, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      isVerified: true,
      role: "patient",
    });

    await newUser.save();
    res.status(201).json({ message: "Registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/patient/:id", async (req, res) => {
  const { username, email, phone } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, phone },
      { new: true }
    );

    res.json({ message: "Patient updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/patient/:id", async (req, res) => {
  try {
    const patient = await User.findById(req.params.id).select("-password");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    if (patient.role !== "patient") {
      return res.status(400).json({ message: "This user is not a patient" });
    }

    res.json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/patient/:id/health", async (req, res) => {
  try {
    const record = new PatientHealth({
      patientId: req.params.id,
      ...req.body, // this stores all extra fields automatically
    });

    await record.save();
    res.status(201).json({ message: "Health data added", record });
  } catch (error) {
    console.error("Health add error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/patient/:id/health", async (req, res) => {
  try {
    const records = await PatientHealth.find({ patientId: req.params.id }).sort(
      {
        createdAt: -1,
      }
    );
    res.json(records);
  } catch (error) {
    console.error("Fetch health error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/health/:recordId", async (req, res) => {
  try {
    await PatientHealth.findByIdAndDelete(req.params.recordId);
    res.json({ message: "Health record deleted" });
  } catch (error) {
    console.error("Delete health error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/patient/:id/daily", async (req, res) => {
  try {
    const daily = await PatientDailyData.find({
      patientId: req.params.id,
    }).sort({ createdAt: -1 });

    res.json(daily);
  } catch (err) {
    console.error("Daily fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET tips for a patient
router.get("/patient/:id/tips", async (req, res) => {
  try {
    const tips = await PatientTip.find({ patientId: req.params.id }).sort({
      createdAt: -1,
    });
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ADD tip for patient
router.post("/patient/:id/tips", async (req, res) => {
  try {
    const { title, message } = req.body;

    const tip = new PatientTip({
      patientId: req.params.id,
      title,
      message,
    });

    await tip.save();
    res.json({ message: "Tip Added", tip });
  } catch (err) {
    res.status(500).json({ message: "Failed to add tip" });
  }
});

// DELETE tip
router.delete("/patient/tip/:tipId", async (req, res) => {
  try {
    await PatientTip.findByIdAndDelete(req.params.tipId);
    res.json({ message: "Tip deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});
module.exports = router;
