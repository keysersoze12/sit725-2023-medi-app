// controllers/medicineController.js
const Medicine = require('../models/medicineModel');

class MedicineController {
  async getAllMedicines(req, res) {
    try {
      const medicines = await Medicine.find();
      res.json({ medicines });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MedicineController;