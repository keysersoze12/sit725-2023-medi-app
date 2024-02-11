// Update prescriptionController.js
class PrescriptionController {
  constructor() {
    this.model = new PrescriptionModel();
    this.cartController = new CartController();
  }

  async getAllMedicines(req, res) {
    try {
      const medicines = await Medicine.find();
      res.json({ medicines });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addToCart(req, res) {
    const { medicineId } = req.body;
    try {
      const medicine = await Medicine.findById(medicineId);
      if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
      this.cartController.addToCart(medicine);
      res.json({ message: 'Medicine added to cart' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async checkout(req, res) {
    const { name, address } = req.body;
    const cartItems = this.cartController.getCart();
    try {
      // Save order to MongoDB
      const order = new Order({ name, address, items: cartItems });
      await order.save();

      // Clear the cart
      this.cartController.clearCart();

      res.json({ message: 'Order placed successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = PrescriptionController