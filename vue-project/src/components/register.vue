<template>
    <v-container class="container">
        <v-row justify="center" class="mt-5">
            <v-col lg="6" md="7" sm="8" class="elevation-5 rounded p-7" xs="1">
                <v-form @submit.prevent="register" style="padding: 10px !important;">
                    <p class="text-center text-h5 mb-5 text-primary font-weight-black">Register</p>

                    <v-row>
                        <v-col lg="6">
                            <v-text-field v-model="UserName" label="Enter Username" placeholder="Enter Your UserName"
                                type="text" variant="outlined" :rules="[RequriedRules.required]" required>
                            </v-text-field>
                        </v-col>
                        <v-col lg="6">
                            <v-text-field v-model="FullName" label="Enter Full Name" placeholder="Enter Your Full Name"
                                type="text" variant="outlined" :rules="[RequriedRules.required]" required>
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col lg="6">
                            <v-text-field v-model="email" label="Enter Email" placeholder="Enter Your Email address"
                                type="email" variant="outlined" :rules="[RequriedRules.required]" requried>
                            </v-text-field>
                        </v-col>
                        <v-col lg="6">
                            <v-text-field v-model="Contact" label="Enter Phone Number"
                                placeholder="Enter Your Phone Number" type="number" variant="outlined"
                                :rules="[NumberRules.required, NumberRules.min]" required>
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col lg="6">

                            <v-text-field :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="visible ? 'text' : 'password'" placeholder="Enter your password"
                                variant="outlined" @click:append-inner="visible = !visible" v-model="password"
                                label="Enter Password" requried :rules="[rules.required, rules.min]">
                            </v-text-field>
                        </v-col>
                        <v-col lg="6">

                            <v-select v-model="selectedRole" :item-props="itemProp" :items="allRoles"
                                label="Select Role" variant="outlined" chips required
                                :rules="[RequriedRules.required]"></v-select>
                        </v-col>
                    </v-row>
                    <div class="text-primary">
                        Already have an account?
                        <router-link to="/login" class="text-primary font-weight-black">sign in</router-link>

                    </div>
                    <div class=" d-flex justify-end mt-4 ">
                        <v-btn text color="primary" type="submit">submit</v-btn>
                    </div>
                    <v-snackbar v-model="snackbar" top right color="error" :timeout="timeout">
                        {{ errMsg }}
                    </v-snackbar>
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
            rules: {
                required: (value) => !!value || "This field is Required.",
                min: (v) => v.length >= 6 || "Min 6 characters",
            },
            NumberRules: {
                required: (value) => !!value || "This field is Required.",
                min: (v) => v.length >= 10 || "Phone number should be at least 10 characters",
            },
            RequriedRules: {
                required: (value) => !!value || "This field is Required.",
            },
            UserName: "",
            email: "",
            password: "",
            FullName: "",
            Contact: "",
            allRoles: [],
            selectedRole: [],
            snackbar: false,
            timeout: 3000,
            errMsg: ""
        }
    },

    mounted() {
        this.getRoles()
    },
    methods: {
        getRoles() {
            axios
                .get("http://192.168.1.25:8010/Api/PDMS/GetAllRoles")
                .then((res) => {
                    this.allRoles = res.data.ServiceObject.map((role) => ({ RoleId: role.RoleId, RoleName: role.RoleName }));
                })
                .catch((error) => {
                    console.error("Error fetching tags:", error);
                });
        },
        itemProp(item) {
            return {
                title: item.RoleName,
                value: item.RoleId,
            }
        },
        register() {
            const userData = {
                UserName: this.UserName,
                Email: this.email,
                Password: this.password,
                FullName: this.FullName,
                Address: this.Address,
                Contact: this.Contact,
                RoleId: this.selectedRole
            }
            axios.post("http://192.168.1.25:8010/Api/PDMS/RegisterNewUser", userData)
                .then((res) => {
                    if (res.StatusCode = 200) {
                        this.$router.push("/login")
                    } else {
                        this.errMsg = res.Message;
                        this.snackbar = true;
                    }
                })
                .catch((error) => {
                    this.errMsg = error.response.data.ServiceObject.Description;
                    this.snackbar = true;
                })
        }
    },
}
</script>

<style scoped>
.container {
    margin-top: 80px;
}
</style>