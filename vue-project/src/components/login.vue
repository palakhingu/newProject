<template>
    <v-container class="container">
        <v-row justify="center" class="mt-5">
            <v-col lg="4" md="5" sm="6" class="elevation-5 rounded p-7 ">
                <v-form @submit.prevent="login" style="padding: 10px !important;">
                    <p class="text-center text-h5 mb-5 text-primary font-weight-black">Login</p>
                    <v-text-field v-model="email" label="Enter Email" placeholder="Enter Your Email address"
                        type="email" variant="outlined" :rules="[RequriedRules.required]" class="mb-5" requried>
                    </v-text-field>
                    <v-text-field :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="visible ? 'text' : 'password'" placeholder="Enter your password" variant="outlined"
                        @click:append-inner="visible = !visible" v-model="password" label="Enter Your Password" requried
                        :rules="[rules.required, rules.min]" class="mb-5">
                    </v-text-field>
                    <router-link to="/forgotPassword" class="text-primary text-decoration-none">Forgot
                        Password?</router-link>
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
import AuthService from "@/services/AuthService";

export default {
    data() {
        return {
            visible: false,
            rules: {
                required: (value) => !!value || "This field is Required.",
                min: (v) => v.length >= 6 || "Min 6 characters",
            },
            email: "",
            password: "",
            snackbar: false,
            timeout: 3000,
            errMsg: "",
            RequriedRules: {
                required: (value) => !!value || "This field is Required.",
            },
        }
    },
    methods: {
        login() {
            const token = localStorage.getItem("token");
            if (token) {
                this.errMsg = "please log out from your account to log in again";
                this.snackbar = true;
                return;
            }
            else {
                AuthService.login({ Email: this.email, Password: this.password })
                    .then((response) => {
                        const token = response.data.Token;
                        const UserName = response.data.Username;
                        localStorage.setItem("token", token);
                        localStorage.setItem("UserName", UserName);
                        this.$router.push("/home");
                    })
                    .catch((error) => {
                        this.errMsg = error.response.data.Message;
                        this.snackbar = true;
                    });
            }

        },
    }
}
</script>

<style scoped>
.container {
    margin-top: 100px;
}
</style>