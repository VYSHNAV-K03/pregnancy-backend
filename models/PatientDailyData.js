const mongoose = require("mongoose");

const dailyDataSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Daily fields
    mood: String,
    sleepHours: Number,
    waterIntake: Number, // in liters
    steps: Number,
    nausea: String,
    painLevel: Number, // 1-10
    dietNotes: String,
    symptoms: String,

    // Optional uploads later
    weight: String,
    bloodPressure: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientDailyData", dailyDataSchema);
