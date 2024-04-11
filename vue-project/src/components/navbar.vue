<script>
import AuthService from "../services/AuthService";
import { cart, removeFromCart, incrementQuantity, decrementQuantity } from './cart'
export default {
    data() {

        return {
            drawer: false,
            access: false,
            cartDrawer: false,
            cart: cart,
            cartCount: 0,
           
        };
    },
    watch: {
        cart: {
            handler(newCart) {
                this.cartCount = newCart.length;
            },
            deep: true,
        },
    },
    mounted(){
        console.log(this.cart);
        this.cartCount = cart.length;
    },
    methods: {
        logout() {
            AuthService.logout();
            this.$router.push("/login");
        },
        removeFromCart(index) {
            removeFromCart(index);
           this.cart = [...cart];
        },
        incrementQuantity(index) {
            incrementQuantity(index);
           this.cart = [...cart];
        },
        decrementQuantity(index) {
            decrementQuantity(index);
           this.cart = [...cart];
        },
        calculateSubtotal(item) {
            return item.Price * item.quantity;
        }


    },
    computed: {
        access() {
            return localStorage.getItem("token") ? true : false;
        }
    },
};
</script>
<template>
    <v-app-bar color="primary" class="text-white">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link to="/" class="router-link"><v-toolbar-title>My App</v-toolbar-title></router-link>
        <v-spacer></v-spacer>
        <router-link to="/products" class="router-link"><v-btn text>Products</v-btn></router-link>
        <router-link to="/addProduct" class="router-link" v-if="access"><v-btn text>Add Product</v-btn></router-link>
        <router-link to="/displayProduct" class="router-link" v-if="access"><v-btn text>Display
                Product</v-btn></router-link>
        <v-btn text @click="logout">Logout</v-btn>
        <v-btn class="text-none" stacked size="large" @click.stop="cartDrawer = !cartDrawer">
            <v-badge color="success" :content="cart.length">
                <v-icon size="large">mdi-cart</v-icon>

            </v-badge>
        </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary>
        <v-list>
            <router-link to="/" class="router-link">
                <v-list-item link>
                    <div class="d-flex">
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="margin-left: 10px !important;">Register</v-list-item-title>
                    </div>
                </v-list-item>
            </router-link>
            <router-link to="/login" class="router-link">
                <v-list-item link>
                    <div class="d-flex">
                        <v-list-item-icon>
                            <v-icon>mdi-login</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="margin-left: 10px !important;">login</v-list-item-title>
                    </div>
                </v-list-item>
            </router-link>
            <router-link to="/home" class="router-link">
                <v-list-item link>
                    <div class="d-flex">
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="margin-left: 10px !important;">Home</v-list-item-title>
                    </div>
                </v-list-item>
            </router-link>
            <v-list-item link>
                <div class="d-flex">
                    <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title style="margin-left: 10px !important;" @click="logout">log out</v-list-item-title>
                </div>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer v-model="cartDrawer" temporary location="right" width="500">
        <v-list>
            <v-subheader>Cart</v-subheader>
            <v-divider></v-divider>
            <v-list-item v-for="(item, index) in cart" :key="index">
                <v-list-item-avatar>
                    <!-- Assuming you have an image URL for each product, you can display the image here -->
                    <!-- <v-img :src="item.Image" height="50" contain></v-img> -->
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>{{ item.ProductName }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.Price }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                    <!-- Decrement quantity button -->
                    <v-btn icon @click="decrementQuantity(index)">
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <!-- Display quantity -->
                    <span>{{ item.quantity }}</span>
                    <!-- Increment quantity button -->
                    <v-btn icon @click="incrementQuantity(index)">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <!-- Remove from cart button -->
                    <v-btn icon @click="removeFromCart(index)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <span>Subtotal: {{ calculateSubtotal(item) }}</span>
                </v-list-item-action>
            </v-list-item>
            <!-- If the cart is empty -->
            <v-list-item v-if="cart.length === 0">
                <v-list-item-content>No items in the cart</v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<style>
.router-link {
    text-decoration: none;
    color: inherit;
}
</style>
