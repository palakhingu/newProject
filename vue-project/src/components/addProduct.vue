<template>
    <v-container class="container">
        <v-row justify="center" class="mt-5">
            <v-col lg="6" md="7" sm="8" class="elevation-5 rounded p-7" xl="4" xs="5">
                <v-form @submit.prevent="addProduct" style="padding: 10px !important;">
                    <p class="text-center text-h5 mb-5 text-primary">Add Product</p>
                    <v-row class="mt-5">
                        <v-col lg="6">
                            <v-text-field label="Enter Product Name" placeholder="Enter Product Name" type="text"
                                variant="outlined" :rules="[RequriedRules.required]" required v-model="ProductName">
                            </v-text-field>
                        </v-col>
                        <v-col lg="6">
                            <v-text-field label="Enter Product Description" placeholder="Enter Product Description"
                                type="text" variant="outlined" :rules="[RequriedRules.required]" required
                                v-model="Description">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col lg="6">
                            <v-text-field label="Enter Product Price" placeholder="Enter Product Price" type="number"
                                variant="outlined" :rules="[RequriedRules.required]" required v-model="Price">
                            </v-text-field>
                        </v-col>
                        <v-col lg="6">
                            <v-text-field label="Enter Product Quantity" placeholder="Enter Product Quantity"
                                type="number" variant="outlined" :rules="[RequriedRules.required]" required
                                v-model="Quantity">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col lg="6">
                            <v-text-field label="Enter Buckle Number" placeholder="Enter Buckle Number" type="number"
                                variant="outlined" :rules="[RequriedRules.required]" required v-model="BuckleNumber">
                            </v-text-field>
                        </v-col>
                        <v-col lg="6">
                            <v-file-input variant="outlined" label="Add Image" placeholder="Add Image" chips
                                append-inner-icon="mdi-paperclip" prepend-icon="" :rules="[RequriedRules.required]"
                                v-model="Image"></v-file-input>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col lg="6">
                            <v-menu :close-on-content-click="false" v-model="ManifacturedMenu">
                                <template v-slot:activator="{ props }">
                                    <v-text-field v-model="ManifacturedDateFormatted" label="Enter Manifactured Date"
                                        placeholder="Enter Manifactured Date" type="button" variant="outlined"
                                        :rules="[RequriedRules.required]" required v-bind="props"
                                        append-inner-icon="mdi-calendar-blank"></v-text-field>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <v-date-picker v-model="ManifacturedDate" hide-header></v-date-picker>
                                    </v-card-title>
                                    <v-card-action class="d-flex justify-end ">
                                        <v-btn variant="text" @click="ManifacturedMenu = false">
                                            Cancel
                                        </v-btn>
                                        <v-btn color="primary" variant="text" @click="ManifacturedMenu = false">
                                            Ok
                                        </v-btn>
                                    </v-card-action>
                                </v-card>
                            </v-menu>


                        </v-col>
                        <v-col lg="6">
                            <v-menu :close-on-content-click="false" v-model="ExpiryMenu">
                                <template v-slot:activator="{ props }">
                                    <v-text-field v-model="ExpiryDateFormatted" label="Enter Expiry Date"
                                        placeholder="Enter Expiry Date" type="button" variant="outlined"
                                        :rules="[RequriedRules.required]" required v-bind="props"
                                        append-inner-icon="mdi-calendar-blank"></v-text-field>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <v-date-picker v-model="ExpiryDate" hide-header></v-date-picker>
                                    </v-card-title>
                                    <v-card-action class="d-flex justify-end ">
                                        <v-btn variant="text" @click="ExpiryMenu = false">
                                            Cancel
                                        </v-btn>
                                        <v-btn color="primary" variant="text" @click="ExpiryMenu = false">
                                            Ok
                                        </v-btn>
                                    </v-card-action>
                                </v-card>
                            </v-menu>

                        </v-col>
                    </v-row>
                    <div class=" d-flex justify-end mt-4 ">
                        <v-btn text color="primary" type="submit">submit</v-btn>
                    </div>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import axios from "axios"

export default {


    data() {
        return {
            visible: false,
            RequriedRules: {
                required: (value) => !!value || "This field is Required.",
            },
            ManifacturedDate: null,
            ExpiryDate: null,
            ManifacturedMenu: false,
            ExpiryMenu: false,
            ProductName: "",
            Description: "",
            Price: "",
            Quantity: "",
            BuckleNumber: "",
            Image: [],
        }
    },


    methods: {
        addProduct() {
            const ProductData = {
                ProductName: this.ProductName,
                ProductDescription: this.Description,
                Price: this.Price,
                BuckleNumber: this.BuckleNumber,
                Quantity: this.Quantity,
                CategoryId: "7816629d-27d6-4128-a430-6ef7d6b5c14b",
                Image: this.Image[0].name,
                ManifacturedAt: this.ManifacturedDateFormatted,
                ExpireAt: this.ExpiryDateFormatted,

            }
            this.$apiService.post("AddNewProduct", ProductData, {
                headers: {
                    'Authorization': localStorage.getItem("token"),
                }
            }).then((res) => {
                console.log(res);
            })
                .catch((err) => {
                    console.log(err);
                })
            console.log(ProductData);
        },

    },
    computed: {
        ManifacturedDateFormatted() {
            if (!this.ManifacturedDate) return ''; // return empty string if no date selected
            const date = new Date(this.ManifacturedDate);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // add leading zero if needed
            const day = date.getDate().toString().padStart(2, '0'); // add leading zero if needed
            return `${year}-${month}-${day}`;
        },
        ExpiryDateFormatted() {
            if (!this.ExpiryDate) return ''; // return empty string if no date selected
            const date = new Date(this.ExpiryDate);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // add leading zero if needed
            const day = date.getDate().toString().padStart(2, '0'); // add leading zero if needed
            return `${year}-${month}-${day}`;
        }
    }
}

</script>
<style scoped>
.container {
    margin-top: 80px;
}
</style>
