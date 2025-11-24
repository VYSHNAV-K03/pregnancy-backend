const mongoose = require("mongoose");

const patientHealthSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Existing fields
    bp: String,
    heartRate: String,
    weight: String,
    sugar: String,
    symptoms: String,
    notes: String,

    // 🔥 New pregnancy fields for each checkup record
    lmp: Date,
    edd: Date,
    pregnancyWeek: Number,
    fetalMovement: String,
    uterusSize: String,
    babyPosition: String,
    growthStatus: String,
    complications: String,

    bloodGroup: String,
    allergies: String,
    chronicConditions: String,
    medications: String,

    scanReport: String,
    doctorNotes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientHealth", patientHealthSchema);
