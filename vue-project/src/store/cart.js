const userId = localStorage.getItem("Userid");
export let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
function saveCartToLocalStorage() {
  if (cart.length == 0) {
    localStorage.removeItem(`cart_${userId}`);
  } else {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  }
}
export function addToCart(product) {
  const alreadyExistProduct = cart.findIndex((item) => item.ProductId === product.ProductId);
  if (alreadyExistProduct !== -1) {
    cart[alreadyExistProduct].quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCartToLocalStorage();
}
export function removeFromCart(index) {
  cart.splice(index, 1);
  saveCartToLocalStorage();
}

export function incrementQuantity(index) {
  cart[index].quantity++;
  saveCartToLocalStorage();
}

export function decrementQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    removeFromCart(index);
  }
  saveCartToLocalStorage();
}
