const mongoose = require('mongoose');

// Define Prescription schema
const prescriptionSchema = new mongoose.Schema({
  name: String,
  medicineSelection: String,
  address: String,
  prescriptionFile: String
});

// Create Prescription model
const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
