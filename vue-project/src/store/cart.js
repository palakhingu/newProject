import { defineStore } from "pinia";
export const useCartStore = defineStore("cart", {
  state: () => ({
    userId: localStorage.getItem("Userid") || "",
    cart: JSON.parse(localStorage.getItem(`cart_${localStorage.getItem("Userid")}`)) || [],
    stockOut: false,
  }),
  getters: {
    totalItems() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.Price * item.quantity, 0);
    },
  },
  actions: {
    addToCart(product) {
      const existItem = this.cart.findIndex((item) => item.ProductId === product.ProductId);
      if (existItem !== -1) {
        if (this.cart[existItem].quantity >= product.Quantity) {
          this.stockOut = true;
        } else {
          this.cart[existItem].quantity++;
        }
      }else {
        this.cart.push({ ...product, quantity: 1 });
      }
      this.saveCartToLocalStorage();
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
      this.saveCartToLocalStorage();
    },
    incrementQuantity(index) {
      if (this.cart[index].quantity >= this.cart[index].Quantity) {
        this.stockOut = true;
      } else {
        this.cart[index].quantity++;
      }
      this.saveCartToLocalStorage();
    },
    decrementQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      } else {
        this.removeFromCart(index);
      }
      this.saveCartToLocalStorage();
    },
    calculateSubtotal(item) {
      return item.Price * item.quantity;
    },
    clearCart() {
      this.cart = [];
      this.saveCartToLocalStorage();
    },
    saveCartToLocalStorage() {
      if (this.cart.length === 0) {
        localStorage.removeItem(`cart_${this.userId}`);
      } else {
        localStorage.setItem(`cart_${this.userId}`, JSON.stringify(this.cart));
      }
    },
  },
});
