<script>
export default {
    data() {
        return {
            userName: ""
        }
    },
    mounted() {
        const username = localStorage.getItem("UserName");
        if (username) {
            this.userName = username;
        }
        else {
            this.$router.push("/login");
        }
    }
}
</script>
<template>
    <v-container class="container">
        <v-row>
            <v-col>
                <div>
                    <h4>hello {{ userName }}</h4>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<style scoped>
.container {
    margin-top: 100px;
}
</style>