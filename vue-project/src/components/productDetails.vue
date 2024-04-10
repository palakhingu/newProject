<template>
    <v-container class="container">
        <v-row v-for="data in result" align="center" class="elevation-5 row">
            <v-col>
                <v-img :src="getImageUrl(data.Image)" width="500" height="500" contain></v-img>
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
                        <div class="text-h6 mb-2">Manifactured Date: {{ data.ManifacturedAt.split("T")[0] }}</div>
                        <div class="text-h6 mb-2">Expiry Date: {{ data.ExpireAt.split("T")[0] }}</div>
                    </v-card-text>
                    <v-card-actions>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
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

                this.$apiService.get(`GetProductById?ProductId=${ProductId}`, {
                    headers: {
                        'authorization': localStorage.getItem("token")
                    }
                })
                    .then((res) => {
                        this.result = res.data
                        console.log(this.result);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        },
        getImageUrl(imagePath) {
            return this.baseUrl + imagePath.replace(/\\/g, '/');
        },
    }
}
</script>

<style scoped>
.container {
    margin-top: 200px;
}

.row {
    margin-left: 100px;
    margin-right: 100px;
    padding: 30px;
}
</style>
