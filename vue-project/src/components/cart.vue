<template>
    <v-container style="margin-top:100px">
        <v-row v-if="cart.length === 0" justify="center" class="mt-9">
            <div>
                <h1 class="mb-4">Your cart is empty!</h1>
                <v-btn color="primary" rounded="xl" variant="outlined" class="ml-9"
                    @click="this.$router.push('/products')">
                    continue shopping
                </v-btn>
            </div>
        </v-row>
        <div v-else>
            <v-row align="center" v justify="center">
                <v-col lg="11" xl="9" md="10" sm="11">
                    <v-table>
                        <thead>
                            <tr>
                                <th style="font-weight: 700;font-size: 20px;padding-left: 50px;">Product</th>
                                <th style="font-weight: 700;font-size: 20px;">Price</th>
                                <th style="font-weight: 700;font-size: 20px;padding-left:45px">Quantity</th>
                                <th style="font-weight: 700;font-size: 20px;">Subtotal</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in cart">
                                <td class="pb-4 pt-4 pr-4 ">
                                    <v-img class="mb-4" :src="getImageUrl(product.Image)" contain width="200"
                                        height="200"></v-img>
                                    <div class="ml-9 text-h5 font-weight-bold " style="font-size: 18px;">{{
            product.ProductName }}</div>
                                </td>
                                <td class=" text-h6">
                                    ₹ {{ product.Price }}
                                </td>
                                <td>
                                    <div class="d-flex">
                                        <v-btn icon color="primary" @click="decrementQuantity(index)">
                                            <v-icon>
                                                mdi-minus
                                            </v-icon>
                                        </v-btn>
                                        <div class="text-h6 mr-3 ml-3 mt-2 font-weight-bold"> {{ product.quantity }}
                                        </div>
                                        <v-btn icon color="primary" @click="incrementQuantity(index)">
                                            <v-icon>
                                                mdi-plus
                                            </v-icon>
                                        </v-btn>
                                    </div>
                                </td>
                                <td class=" text-h5 font-weight-bold">
                                    <v-chip size="large" class="ml-4">₹ {{ calculateSubtotal(product) }}</v-chip>
                                </td>
                                <td>
                                    <v-btn icon color="error" @click="removeFromCart(index)">
                                        <v-icon>
                                            mdi-delete
                                        </v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col lg="3" md="4" sm="5" xl="2">
                    <v-card elevation="5">
                        <v-card-text>
                            <div class="mb-6 d-flex justify-space-between pl-2 pr-4">
                                <div>
                                    <v-icon size="large">mdi-cart-outline</v-icon>
                                    <span class="ml-4 text-h6 ">Total Items : </span>
                                </div>
                                <div class="text-h5 font-weight-bold  mt-1 text-blue-darken-4">
                                    {{ totalItems }}
                                </div>
                            </div>
                            <div class=" d-flex justify-space-between pl-2 pr-4">
                                <div>
                                    <v-icon size="large">mdi-currency-inr</v-icon>
                                    <span class="ml-4  text-h6 ">Sub Total : </span>
                                </div>
                                <div class="text-h5 font-weight-bold  mt-1 text-blue-darken-4">
                                    {{ totalPrice }}
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </div>

    </v-container>
</template>

<script>
import { cart, removeFromCart, incrementQuantity, decrementQuantity } from '../store/cart';

export default {
    data() {
        return {
            cart: cart,
            baseUrl: 'http://192.168.1.25:8010/',
        };
    },
    computed: {
        totalItems() {
            return this.cart.reduce((total, item) => total + item.quantity, 0);
        },
        totalPrice() {
            return this.cart.reduce((total, item) => total + (item.Price * item.quantity), 0);
        }
    },
    methods: {
        getUserId() {
            return localStorage.getItem('Userid');
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
        },
        getImageUrl(imagePath) {
            return this.baseUrl + imagePath.replace(/\\/g, '/');
        },
    },
};
</script>

<style scoped></style>
