// controllers/cartController.js
class CartController {
    constructor() {
      this.cart = [];
    }
  
    addToCart(medicine) {
      this.cart.push(medicine);
    }
  
    getCart() {
      return this.cart;
    }
  
    clearCart() {
      this.cart = [];
    }
  }
  
  module.exports = CartController;
  