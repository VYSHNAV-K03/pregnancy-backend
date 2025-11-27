const mongoose = require("mongoose");

const patientHealthSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ✅ BASIC PROFILE DETAILS (STATIC)
    patientName: String,
    hospitalId: String,
    age: Number,
    trimester: {
      type: String,
      enum: ["1st", "2nd", "3rd"],
    },
    patientType: {
      type: String,
      enum: ["Pregnant", "Lactating", "Postnatal"],
    },

    height: String,
    weight: String,

    dietaryPreference: {
      type: String,
      enum: ["Veg", "Non-Veg", "Egg", "Vegan"],
    },

    deficiencies: {
      anemia: { type: Boolean, default: false },
      vitaminD: { type: Boolean, default: false },
      proteinEnergy: { type: Boolean, default: false },
    },

    // ✅ CHECKUP DETAILS (DYNAMIC)
    bp: String,
    heartRate: String,
    sugar: String,
    fetalMovement: String,
    uterusSize: String,
    babyPosition: String,
    growthStatus: String,
    complications: String,

    // ✅ DATES & STAGES
    lmp: Date,
    edd: Date,
    pregnancyWeek: Number,

    // ✅ MEDICAL HISTORY
    bloodGroup: String,
    allergies: String,
    chronicConditions: String,
    medications: String,

    // ✅ REPORTS
    scanReport: String,

    // ✅ DOCTOR INPUT
    doctorNotes: String,

    // ✅ NOTES
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientHealth", patientHealthSchema);
