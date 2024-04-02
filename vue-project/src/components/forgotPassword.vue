<template>
    <v-container class="container">
        <v-row class="d-flex justify-center mt-6">
            <v-col lg="4" md="5" sm="6" class="elevation-5 rounded p-7">
                <v-form @submit.prevent="resetPassword" style="padding: 10px !important;">
                    <p class="text-center text-h5 mb-6 text-primary ">Reset Password</p>
                    <br>
                    <v-text-field v-model="email" label="Enter Email" placeholder="Enter Your Email address"
                        type="email" variant="outlined" :rules="[RequriedRules.required]" class="mb-3" requried>
                    </v-text-field>
                    <div class=" d-flex justify-end mt-4">
                        <v-btn text color="primary" type="submit">submit</v-btn>
                    </div>
                    <v-snackbar v-model="snackbar" top right :color="getSnackbarColor()" :timeout="timeout">
                        {{ errMsg }}
                    </v-snackbar>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: "",
            snackbar: false,
            timeout: 3000,
            errMsg: "",
            flag: true,
            RequriedRules: {
                required: (value) => !!value || "This field is Required.",
            },
        }
    },
    methods: {
        resetPassword() {
            axios.get(`http://192.168.1.25:8010/Api/PDMS/ForgotPassword/${this.email}`)
                .then((res) => {
                    this.errMsg = res.data.Message
                    this.snackbar = true;
                })
                .catch((err) => {
                    this.errMsg = err.response.data.Description;
                    this.snackbar = true;
                    this.flag = false;
                    console.log(err);
                })
        },
        getSnackbarColor() {
            return this.flag ? 'success' : 'error';
        }

    }

}
</script>

<style scoped>
.container {
    margin-top: 100px;
}
</style>