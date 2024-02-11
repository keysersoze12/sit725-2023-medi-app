const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkoutSchema = new Schema({
  name: String,
  medicine: String,
  dosage: String // Define dosage field in the schema
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
