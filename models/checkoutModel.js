const mongoose = require('mongoose');

// Define the schema for the checkout information
const checkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  medicine: {
    type: String,
    required: true
  },
  dosage: {
    type: String, // Assuming dosage is a string, modify as needed
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Checkout model based on the schema
const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
