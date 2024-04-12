export let cart = JSON.parse(localStorage.getItem(`cart_${localStorage.getItem("Userid")}`)) || [];

function saveCartToLocalStorage(userId) {
  localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
}

export function addToCart(product, userID) {
  cart.push({ ...product, quantity: 1 });
  saveCartToLocalStorage(userID);
}

export function removeFromCart(index, userId) {
  cart.splice(index, 1);
  saveCartToLocalStorage(userId);
}

export function incrementQuantity(index, userId) {
  cart[index].quantity++;
  saveCartToLocalStorage(userId);
}

export function decrementQuantity(index, userId) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    removeFromCart(index);
  }
  saveCartToLocalStorage(userId);
}

