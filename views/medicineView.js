// views/medicineView.js
class MedicineView {
    renderMedicine(medicine) {
      return {
        id: medicine._id,
        name: medicine.name,
        price: medicine.price,
      };
    }
  
    renderMedicines(medicines) {
      return medicines.map(medicine => this.renderMedicine(medicine));
    }
  }
  
  module.exports = MedicineView;
  