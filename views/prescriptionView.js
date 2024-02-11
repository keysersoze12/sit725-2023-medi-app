// views/prescriptionView.js
class PrescriptionView {
    renderPrescription(prescription) {
      return {
        patientName: prescription.patientName,
        prescriptionFile: prescription.prescriptionFile.filename,
      };
    }
   
    renderPrescriptions(prescriptions) {
      return prescriptions.map(prescription => this.renderPrescription(prescription));
    }
  }
   
  module.exports = PrescriptionView;