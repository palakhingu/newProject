import { defineStore } from "pinia";
export const useCartStore = defineStore("cart", {
  state: () => ({
    userId: localStorage.getItem("Userid") || "",
    cart: JSON.parse(localStorage.getItem(`cart_${localStorage.getItem("Userid")}`)) || [],
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
      const alreadyExistProductIndex = this.cart.findIndex((item) => item.ProductId === product.ProductId);
      if (alreadyExistProductIndex !== -1) {
        this.cart[alreadyExistProductIndex].quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      this.saveCartToLocalStorage();
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
      this.saveCartToLocalStorage();
    },
    incrementQuantity(index) {
      this.cart[index].quantity++;
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
    saveCartToLocalStorage() {
      if (this.cart.length === 0) {
        localStorage.removeItem(`cart_${this.userId}`);
      } else {
        localStorage.setItem(`cart_${this.userId}`, JSON.stringify(this.cart));
      }
    },
  },
});