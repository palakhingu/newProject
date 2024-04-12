<template>
    <v-container style="margin-top:100px">
        <v-row align="center">
           <v-col lg="8">
                <v-table>
                    <thead>
                        <tr >
                            <th  style="font-weight: 700;font-size: 20px;padding-left: 50px;">Product</th>
                            <th   style="font-weight: 700;font-size: 20px;">Price</th>
                            <th   style="font-weight: 700;font-size: 20px;padding-left:45px">Quantity</th>
                            <th   style="font-weight: 700;font-size: 20px;">Subtotal</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product,index) in cart">
                            <td class="pb-4 pt-4 pr-4 "  >
                                <v-img  class="mb-4" :src="getImageUrl(product.Image)" contain width="200" height="200"></v-img>
                                <div class="ml-6 " style="font-size: 18px;">{{ product.ProductName }}</div>
                            </td>
                            <td class=" text-h6">
                                ₹ {{ product.Price }}
                            </td>
                            <td >
                               <div class="d-flex">
                                <v-btn icon color="primary" @click="decrementQuantity(index)">
                                    <v-icon>
                                        mdi-minus
                                    </v-icon>
                                </v-btn>
                               <div class="text-h6 mr-3 ml-3 mt-2 font-weight-bold"> {{ product.quantity }}</div>
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
                                <v-btn icon color="error"  @click="removeFromCart(index)" >
                                    <v-icon>
                                        mdi-delete
                                    </v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
           </v-col>
            <v-col cols="4" justify="center" class="pl-1">
        <v-card elevation="5" >
          <v-card-title class="text-center text-h5 mt-4 mb-4 ">Cart Summary</v-card-title>
          <hr>
          <v-card-text>
            <div class="mb-6 d-flex justify-space-between pl-2 pr-4">
                <div>
                    <v-icon size="large">mdi-cart</v-icon>
              <span class="ml-4  text-h6 ">Total Items : </span>
                </div>
                <div class="text-h5 font-weight-bold  mt-1 text-blue-darken-4">
                    {{ totalItems }}
                </div>
            </div>
            <div class="mb-6 d-flex justify-space-between pl-2 pr-4">
                <div>
                    <v-icon size="large">mdi-currency-inr</v-icon>
              <span class="ml-4  text-h6 ">Sub Total : </span>
                </div>
                <div class="text-h5 font-weight-bold  mt-1 text-blue-darken-4">
                    {{ totalPrice }}
                </div>
            </div>  
          </v-card-text>
          <hr>
          <v-card-actions class="justify-center ">
            <v-btn color="primary" outlined @click="checkout">Checkout</v-btn>
          </v-card-actions>
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

</style>

