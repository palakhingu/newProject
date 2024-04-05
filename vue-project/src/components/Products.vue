<template>
    <v-container class="container">
        <v-row justify="center">
            <v-col v-for="(product, index) in ServiceObject" :key="product.ProductId" cols="auto" class="cards">
                <v-card class="mx-auto elevation-5 " width="280" height="360">
                    <v-card-item>
                        <div class="d-flex justify-center">
                            <img :src="getImageUrl(product.Image)" width="220" height="210" class="mt-4"></img>

                        </div>
                        <div>
                            <div class="mt-3 mb-4 font-weight-bold text-center text-body-1">
                                {{ product.ProductName }}
                            </div>
                            <div class="text-subtitle-1 mb-">₹ {{ product.Price }}</div>
                            <div class="text-subtitle-1">Quantity: {{ product.Quantity }}</div>
                        </div>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            ServiceObject: [],
            baseUrl: 'http://192.168.1.25:8010/' // Replace this with your actual base URL
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
                    console.log(res);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                });
        },
        getImageUrl(imagePath) {
            return this.baseUrl + imagePath.replace(/\\/g, '/');

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
}
</style>


