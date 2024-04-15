<template>
    <v-container class="container">
        <v-row justify="center">
            <v-col v-for="(product, index) in ServiceObject" :key="product.ProductId" cols="auto" class="cards">
                <v-card class="mx-auto elevation-5 " width="280" max-height="450">
                    <v-card-item>
                        <div class="d-flex justify-center">
                            <v-img :src="getImageUrl(product.Image)" width="220" height="230" class="mt-4"
                                contain></v-img>
                        </div>
                        <div>
                            <div class="mt-4 mb-4 font-weight-bold text-center text-capitalize "
                                style="font-size: 17px;">
                                {{ product.ProductName }}
                            </div>
                            <div class="d-flex ml-4 mr-4 mb-5 justify-space-between">
                                <p class="font-weight-medium "> ₹ {{ product.Price }}</p>
                                <p class="font-weight-medium">
                                    Quantity: {{ product.Quantity }}
                                </p>
                            </div>
                            <div class="d-flex justify-center">
                                <v-btn color="primary" @click="redirect(product.ProductId)" size="small" rounded="xl"
                                    class="font-weight-bold" elevation="1" variant="outlined">More Details</v-btn>
                            </div>
                        </div>
                    </v-card-item>
                    <v-card-actions class="justify-end">
                        <v-btn color="primary" @click="handleAddToCart(product)">Add to Cart</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// import { addToCart } from '../store/cart'  
import { useCartStore } from '../store/cart'

export default {

    data() {
        return {
            ServiceObject: [],
            baseUrl: 'http://192.168.1.25:8010/',
            // cart: [],
        }
    },
    mounted() {
        this.products()
    },
    methods: {
        products() {
            this.$apiService.get("GetAllProducts", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
                .then((res) => {
                    this.ServiceObject = res.data.ServiceObject;
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                });
        },
        getImageUrl(imagePath) {
            return this.baseUrl + imagePath.replace(/\\/g, '/');
        },
        redirect(id) {
            this.$router.push(`productDetails/${id}`)
        },
        handleAddToCart(product) {
            useCartStore().addToCart(product);  
            this.$toast.success("Product added to cart successfully");
        }

    }
}
</script>

<style scoped>
.container {
    margin-top: 100px;
}

.cards {
    margin: 30px;
    transition: all 0.1s ease-out;
}

.cards:hover {
    transform: translateY(-5px);
}
</style>