const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ContactMessage", contactSchema);
