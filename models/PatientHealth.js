const mongoose = require("mongoose");

const patientHealthSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔹 Basic Patient Data Section
    patientName: String, // Name
    hospitalId: String, // Hospital / Clinic ID
    age: Number,
    trimester: {
      // 1st / 2nd / 3rd
      type: String,
      enum: ["1st", "2nd", "3rd"],
    },
    patientType: {
      // Normal Pregnant / Lactating / Postnatal
      type: String,
      enum: ["Pregnant", "Lactating", "Postnatal"],
    },

    height: String,
    weight: String,

    dietaryPreference: {
      type: String,
      enum: ["Veg", "Non-Veg", "Egg", "Vegan"],
    },

    // 🔹 Known deficiencies
    deficiencies: {
      anemia: { type: Boolean, default: false },
      vitaminD: { type: Boolean, default: false },
      proteinEnergy: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientHealth", patientHealthSchema);
