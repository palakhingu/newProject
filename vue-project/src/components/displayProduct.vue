<template>
    <v-container class="container">
        <v-row justify="center" class="mt-5">
            <v-col xl=10 lg="12" md=12 sm="12">
                <v-row justify="end">
                    <v-col lg="2">
                        <v-text-field v-model="itemsPerPage" class="pa-2" label="Products per page" max="100" min="1"
                            type="number" hide-details @change="loadItems" width="1" variant="outlined"></v-text-field>
                    </v-col>
                    <v-col lg="3">
                        <v-text-field v-model="search" type="text" class="pa-2" @input="loadItems" variant="outlined"
                            label="Search" placholder="Search"></v-text-field>
                    </v-col>
                </v-row>
                <v-table fixed-header v-if="!noData" class="rounded elevation-5 text-subtitle-1" height="500"
                    density="default">
                    <thead>
                        <tr>
                            <th class="tex-center text-h6 text-white" style="background-color:#3B71CA ;">
                                ProductName
                            </th>
                            <th class="text-center text-h6 text-white" style="background-color:#3B71CA ;">
                                Product Description
                            </th>
                            <th class="tex-center text-h6 text-white" style="background-color:#3B71CA ;">
                                Price
                            </th>
                            <th class="text-center text-h6 text-white" style="background-color:#3B71CA ;">
                                Quantity
                            </th>
                            <th class="tex-center text-h6 text-white" style="background-color:#3B71CA ;">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <br>
                    <tbody>
                        <tr v-for="(product) in serverItems">
                            <td class="text-center ">{{ product.ProductName }}</td>
                            <td class="text-center ">{{ product.ProductDescription }}</td>
                            <td class="text-center">{{ product.Price }}</td>
                            <td class="text-center">{{ product.Quantity }}</td>
                            <td>
                                <div class="d-flex">
                                    <v-btn color="success" class="mr-3"
                                        @click="updateProduct(product.ProductId)">Update</v-btn>
                                    <v-btn color="error" @click="this.delete(product.ProductId)">delete</v-btn>
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </v-table>

                <div v-else class="text-center">
                    {{ noData }}
                </div>
                <br>

                <div class="mt-3">
                    <v-row justify="center">
                        <v-col cols="12">
                            <v-pagination v-model="page" @click="loadItems" :length="pages"></v-pagination>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </v-container>

</template>
<script>
export default {
    data() {
        return {
            page: 1,
            itemsPerPage: 5,
            serverItems: [],
            pages: 0,
            search: "",
            noData: ""
        };
    },
    methods: {
        delete(id) {
            this.$apiService.delete(`DeleteProduct?ProductId=${id}`,
                {
                    headers: { Authorization: localStorage.getItem("token") },
                })
                .then((res) => {
                    this.loadItems();
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        updateProduct(productId) {
            this.$router.push(`/addProduct/${productId}`);
        },
        loadItems() {
            this.$apiService
                .get(`GetDynamicProductList/${this.page}/${this.itemsPerPage}/?searchText=${this.search}`, {
                    headers: { Authorization: localStorage.getItem("token") },
                })
                .then((res) => {
                    console.log(res);
                    if (res.statusText === "OK" && res.status === 200) {
                        this.serverItems = res.data.Result;
                        this.pages = res.data.Pages;
                        this.noData = null;
                    }
                    else if (res.statusText === "No Content" && res.status === 204) {
                        this.noData = "No Data Available";
                        this.serverItems = [];
                    } else {
                        this.noData = res.statusText
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.loadItems();
    },
};
</script>

<style scoped>
.container {
    margin-top: 35px;
}

v-table {
    padding: 10px;
}
</style>

