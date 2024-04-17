<template>
    <v-container class="container">
        <v-row justify="center" class="mt-5">
            <v-col xl="10" lg="12" md=12 sm="12">
                <v-row justify="end">
                    <v-col lg="2">
                        <v-text-field v-model="itemsPerPage" class="pa-2" label="Rows per page" max="100" min="1"
                            type="number" hide-details @change="loadItems" width="1" variant="outlined"></v-text-field>
                    </v-col>
                    <v-col lg="3">
                        <v-text-field v-model="search" type="text" class="pa-2" @input="loadItems" variant="outlined"
                            label="Search" placholder="Search"></v-text-field>
                    </v-col>
                </v-row>
                <v-table fixed-header v-if="!noData" class="rounded elevation-5 text-subtitle-1" height="600"
                    density="default">
                    <thead>
                        <tr>
                            <th class="tex-center text-h6 text-white" style="background-color:#3B71CA ;"
                                v-for="column in columns">
                                {{ column }}
                            </th>
                        </tr>
                    </thead>
                    <br>
                    <tbody>
                        <tr v-for="(order) in serverItems">
                            <td class="text-center pa-6">{{ order.orderId }}</td>
                            <td class="text-center pa-6">{{ order.CustomerName }}</td>
                            <td class="text-center pa-6">{{ order.productName }}</td>
                            <td class="text-center pa-6">{{ order.price }}</td>
                            <td class="text-center pa-6">{{ order.quantity }}</td>
                            <td class="text-center pa-6">{{ order.category }}</td>
                            <td class="text-center pa-6">{{ order.orderStatus }}</td>
                            <td>
                                <div class="d-flex">
                                    <v-btn color="success" class="mr-3" icon>
                                        <v-icon>
                                            mdi-pencil
                                        </v-icon>
                                    </v-btn>
                                    <v-btn color="error" icon>
                                        <v-icon>
                                            mdi-delete
                                        </v-icon>
                                    </v-btn>
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
            itemsPerPage: 8,
            serverItems: [],
            pages: 0,
            search: "",
            noData: "",
            columns: ["Order Id", "Customer Name", "Product Name", "Price", "Quantity", "Category", "Order Status", "Action"]
        };
    },
    mounted() {
        this.loadItems();
    },
    methods: {
        loadItems() {
            this.$apiService
                .get(`GetDynamicOrderList/${this.page}/${this.itemsPerPage}/?searchText=${this.search}`, {
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
    }
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
