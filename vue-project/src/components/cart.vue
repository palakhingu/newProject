<template>
    <v-container style="margin-top:100px">
        <v-row justify="center">
            <v-col v-for="(product, index) in cart" :key="product.ProductId" cols="7" sm="7">
                <v-card class="mb-5  elevation-5 pl-5 pr-5 pb-5 pt-5">
                    <v-row align="center">
                        <v-col cols="4">
                            <v-img :src="getImageUrl(product.Image)" contain width="200" height="200"></v-img>
                        </v-col>
                        <v-col cols="6" class="mb-5">
                            <p class="text-h5 mb-3 font-weight-bold ml-6">{{ product.ProductName }}</p>
                            <p class="text-body-1 mb-3 ml-10">Price: ₹{{ product.Price }}</p>
                            <v-btn icon @click="incrementQuantity(index)" color="primary" class="mr-2">
                                <v-icon>
                                    mdi-plus
                                </v-icon></v-btn>
                            <span class="text-body-1">{{ product.quantity }}</span>
                            <v-btn icon @click="decrementQuantity(index)" color="primary" class="ml-2 ">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                            <br>
                            <v-btn @click="removeFromCart(index)" color="error" class="mt-2">Remove</v-btn>
                        </v-col>
                        <v-col cols="2" class="text-right">
                            <p class="text-body-1">Subtotal: ₹{{ calculateSubtotal(product) }}</p>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
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
    methods: {
        getUserId() {
            return localStorage.getItem('Userid');
        },
        removeFromCart(index) {
            removeFromCart(index, this.getUserId());
            this.cart = [...cart];
        },
        incrementQuantity(index) {
            incrementQuantity(index, this.getUserId());
            this.cart = [...cart];
        },
        decrementQuantity(index) {
            decrementQuantity(index, this.getUserId());
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

<style scoped>
.text-h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
}

.text-h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.text-body-1 {
    font-size: 1rem;
}

.text-right {
    text-align: right;
}
</style>

