<template>
    <v-container class="container">
        <v-row justify="center" class="mt-5">
            <v-col lg="4" xl="3" md="6" sm="6" xs="4" class="elevation-5 rounded p-7 ">
                <v-form @submit.prevent="login" style="padding: 10px !important;">
                    <p class="text-center text-h5 mb-5 text-primary font-weight-black">Login</p>
                    <v-text-field v-model="email" label="Enter Email" placeholder="Enter Your Email address"
                        type="email" variant="outlined" :rules="[RequriedRules.required]" class="mb-5" requried>
                    </v-text-field>
                    <v-text-field :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="visible ? 'text' : 'password'" placeholder="Enter your password" variant="outlined"
                        @click:append-inner="visible = !visible" v-model="password" label="Enter Your Password" requried
                        :rules="[RequriedRules.required]">
                    </v-text-field>
                    <router-link to="/forgotPassword" class="text-primary text-decoration-none ">Forgot
                        Password?</router-link>
                    <div class=" d-flex justify-end mt-4 ">
                        <v-btn text color="primary" type="submit">submit</v-btn>
                    </div>
                    <div class="text-primary mt-4 d-flex justify-center">
                        don't have an account?
                        <router-link to="/" class="text-primary font-weight-black ">sign
                            up</router-link>
                    </div>
                </v-form>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useNavbarStore } from "@/store/navbar";

export default {
    data() {
        return {
            visible: false,
            email: "",
            password: "",
            RequriedRules: {
                required: (value) => !!value || "This field is Required.",
            },
        }
    },
    methods: {
        login() {
            const data = {
                Email: this.email,
                Password: this.password
            }
            this.$apiService.post("Login", data)
                .then((response) => {
                    console.log(response);
                    const token = response.data.Token;
                    const userId = response.data.Userid;
                    localStorage.setItem("token", token);
                    localStorage.setItem("Userid", userId);
                    this.$router.push("/products");
                    useNavbarStore().isAuthenticated =true;
                })
                .catch((error) => {
                    console.log(error);
                    this.$toast.error(error.response.data.Message)
                });
        }
    },
}

</script>

<style scoped>
.container {
    margin-top: 100px;
}
</style>
