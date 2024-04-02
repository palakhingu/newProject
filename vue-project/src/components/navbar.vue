<script>
import AuthService from "../services/AuthService";

export default {
    data() {
        return {
            drawer: false,
        };
    },
    methods: {
        logout() {
            AuthService.logout();
            this.$router.push("/login");
        },
    },
};
</script>
<template>
    <v-app-bar color="primary" class="text-white">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link to="/" class="router-link"><v-toolbar-title>My App</v-toolbar-title></router-link>
        <v-spacer></v-spacer>
        <router-link to="/home" class="router-link"><v-btn text>Home</v-btn></router-link>
        <v-btn text @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
        <v-list>
            <router-link to="/" class="router-link">
                <v-list-item link>
                    <div class="d-flex">
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="margin-left: 10px !important;">Register</v-list-item-title>
                    </div>
                </v-list-item>
            </router-link>
            <router-link to="/login" class="router-link">
                <v-list-item link>
                    <div class="d-flex">
                        <v-list-item-icon>
                            <v-icon>mdi-login</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="margin-left: 10px !important;">login</v-list-item-title>
                    </div>
                </v-list-item>
            </router-link>
            <router-link to="/home" class="router-link">
                <v-list-item link>
                    <div class="d-flex">
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="margin-left: 10px !important;">Home</v-list-item-title>
                    </div>
                </v-list-item>
            </router-link>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
                <v-btn block @click="logout" color="primary">
                    Logout
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>
<style>
.router-link {
    text-decoration: none;
    color: inherit;
}
</style>
