<template>
    <v-container class="container">
        <v-row v-for="data in result" align="center" class="elevation-10 row">
            <v-col>
                <v-img :src="getImageUrl(data.Image)" width="400" height="400" contain></v-img>
            </v-col>
            <v-col>
                <v-card variant="flat">
                    <v-card-title class="text-h4 mb-6">{{ data.ProductName }}</v-card-title>
                    <v-card-text class="text-subtitle-1">
                        <div class="text-h6 font-weight-medium mb-3">
                            {{ data.ProductDescription }}
                        </div>
                        <div class="text-h4 font-weight-medium mb-3">₹ {{ data.Price }}</div>
                        <div class="text-h6 mb-2">Quantity : {{ data.Quantity }}</div>
                        <div class="text-h6 mb-2">Manifactured Date : {{ data.ManifacturedAt.split("T")[0] }}</div>
                        <div class="text-h6 mb-2">Expiry Date : {{ data.ExpireAt.split("T")[0] }}</div>
                    </v-card-text>
                    <div>
                        <v-btn color="success" prepend-icon="mdi-cart" @click="handleAddToCart(data)"> Add to
                            cart</v-btn>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useCartStore } from '../store/cart'

export default {
    data() {
        return {
            result: [],
            baseUrl: 'http://192.168.1.25:8010/'
        }
    },
    mounted() {
        this.getProduct()
    },
    methods: {
        getProduct() {
            const ProductId = this.$route.params.id;
            if (ProductId) {

                this.$apiService.get(`GetProductById/${ProductId}`, {
                    headers: {
                        'authorization': localStorage.getItem("token")
                    }
                })
                    .then((res) => {
                        console.log(res);
                        this.result = res.data
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        },
        getImageUrl(imagePath) {
            return this.baseUrl + imagePath.replace(/\\/g, '/');
        },
        handleAddToCart(product) {
            if (useCartStore().stockOut) {
                this.$toast.error("Product is out of stock")
            }
            else {

                useCartStore().addToCart(product);
            }
        }

    }
}
</script>

<style scoped>
.container {
    margin-top: 200px;
}

.row {
    margin-left: 150px;
    margin-right: 150px;
    padding: 30px;
}
</style>
