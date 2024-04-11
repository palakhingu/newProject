export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(product) {
    cart.push({ ...product, quantity: 1 });
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
