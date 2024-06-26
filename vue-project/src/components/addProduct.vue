<template>
    <v-container class="container">
        <v-row justify="center" class="mt-5">
            <v-col lg="6" md="8" sm="8" class="elevation-5 rounded p-7" xl="4" xs="5">
                <v-form @submit.prevent="addProduct" style="padding: 10px !important">
                    <p class="text-center text-h5 mb-5 text-primary">{{ FormTitle }}</p>
                    <v-row class="mt-5">
                        <v-col lg="6">
                            <v-text-field label="Enter Product Name" placeholder="Enter Product Name" type="text"
                                variant="outlined" :rules="[RequriedRules.required]" required v-model="ProductName">
                            </v-text-field>
                        </v-col>
                        <v-col lg="6">
                            <v-select v-model="selectedCategory" :items="allCategories" label="Select Category"
                                variant="outlined" chips required placeholder="Add Image"
                                :rules="[RequriedRules.required]">
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea label="Enter Product Description" variant="outlined" rows="3" no-resize
                                :rules="[RequriedRules.required]" v-model="Description" required
                                placeholder="Enter Product Description"></v-textarea>
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
                                variant="outlined" :rules="[RequriedRules.required]" required v-model="BuckleNumber"
                                hint="6 digits">
                            </v-text-field>
                        </v-col>
                        <v-col lg="6">
                            <v-file-input variant="outlined" label="Add Image" placeholder="Add Image"
                                append-inner-icon="mdi-paperclip" prepend-icon="" @change="handleFileUpload"
                                v-model="Image">
                                <template v-slot:prepend-inner>
                                    <span v-if="Image" class="truncate">{{ Image.name }} </span>
                                </template>
                            </v-file-input>
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
                    <v-row justify="center">
                        <v-col lg="6" sm="6" md="6">
                        </v-col>
                    </v-row>
                    <div class=" d-flex justify-end mt-4 ">
                        <v-btn text color="primary" type="submit" size="large">submit</v-btn>
                    </div>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
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
            allCategories: [],
            selectedCategory: [],
            baseUrl: 'http://192.168.1.25:8010/',
            FormTitle: "Add Product"

        }
    },
    mounted() {
        this.getCategories();
        if (this.$route.params.id) {
            this.updateForm(this.$route.params.id);
        }
    },
    computed: {
        ManifacturedDateFormatted() {
            if (!this.ManifacturedDate) return '';
            const date = new Date(this.ManifacturedDate);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        ExpiryDateFormatted() {
            if (!this.ExpiryDate) return '';
            const date = new Date(this.ExpiryDate);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    },
    methods: {
        handleFileUpload(event) {
            this.Image = event.target.files[0];
        },
        getCategories() {
            this.$apiService.get("GetAllCategories", {
                headers: {
                    'Authorization': localStorage.getItem("token")
                }
            })
                .then((res) => {
                    this.allCategories = res.data.map((category) => ({ value: category.CategoryId, title: category.CategoryName }));
                })
                .catch((error) => {
                    console.error("Error fetching tags:", error);
                });
        },
        addProduct() {
            if (this.$route.params.id) {
                this.update(this.$route.params.id);

            }
            else {
                const formData = {
                    ProductName: this.ProductName,
                    ProductDescription: this.Description,
                    Price: this.Price,
                    BuckleNumber: this.BuckleNumber,
                    Quantity: this.Quantity,
                    CategoryId: this.selectedCategory,
                    Image: this.Image,
                    ManifacturedAt: this.ManifacturedDateFormatted,
                    ExpireAt: this.ExpiryDateFormatted
                }
                console.log(formData);
                this.$apiService.post("AddNewProduct", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': localStorage.getItem("token")
                    }
                }).then((res) => {
                    if (res.statusText == "OK" && res.status == 200) {
                        this.$router.push("/displayProduct")
                    }
                }).catch((err) => {
                    console.log(err.response.data);
                    err.response.data.map((error) => {
                        if (error.Parameter == "CategoryId") {
                            this.$toast.error(error.Description)
                        }
                        if (error.Parameter == "Price") {
                            this.$toast.error(error.Description)
                        }
                        if (error.Parameter == "Quantity") {
                            this.$toast.error(error.Description)
                        }
                        if (error.ErrorCode === 90003) {
                            this.$toast.error(error.Description)
                        }
                    })
                });
            }
        },
        updateForm(id) {
            this.FormTitle = "Update Product"
            this.$apiService.get(`GetProductById/${id}`, {
                headers: {
                    'authorization': localStorage.getItem("token")
                }
            })
                .then((res) => {
                    console.log(res);
                    const product = res.data[0];
                    const blob = new Blob([], { type: 'application/octet-stream' });
                    console.log('blob: ', blob);
                    const file = new File([blob], product.Image.split("\\")[2])

                    this.Image = file;
                    this.ProductName = product.ProductName;
                    this.Description = product.ProductDescription;
                    this.Price = product.Price;
                    this.Quantity = product.Quantity;
                    this.BuckleNumber = product.BuckleNumber;
                    this.selectedCategory = product.CategoryId;
                    this.ManifacturedDate = new Date(product.ManifacturedAt);
                    this.ExpiryDate = new Date(product.ExpireAt);

                })
                .catch((err) => {
                    console.log(err);
                })

        },
        update(id) {
            console.log('this.Image: ', this.Image);
            const formData = {
                ProductId: id,
                ProductName: this.ProductName,
                ProductDescription: this.Description,
                Price: this.Price,
                BuckleNumber: this.BuckleNumber,
                Quantity: this.Quantity,
                CategoryId: this.selectedCategory,
                Image: this.Image,
                ManifacturedAt: this.ManifacturedDateFormatted,
                ExpireAt: this.ExpiryDateFormatted
            }
            this.$apiService.post("UpdateProduct", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': localStorage.getItem("token")
                }
            }).then((res) => {
                console.log(res);
                if (res.data.StatusCode === "OK") {
                    this.$router.push("/displayProduct")
                }
            }).catch((err) => {
                if (err.response.data.ServiceObject.ExceptionMessage === "Object reference not set to an instance of an object.") {
                    this.$toast.error("please select image for product")
                }
            });
        },
    },


}
</script>
<style scoped>
.container {
    margin-top: 80px;
}

.truncate {
    max-width: 190px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
