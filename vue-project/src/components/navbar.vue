<script>
import { useCartStore } from '../store/cart'
import { useAuthStore } from "@/store/auth";
export default {
    data() {

        return {
            drawer: false,
        };
    },
    computed: {
        access() {
            return useAuthStore().isAuthenticated;
        },
        cart() {
            return useCartStore().cart;
        },
    },
    methods: {
        logout() {
            useAuthStore().logout();
            this.$router.push("/login");
        },

    },
};
</script>
<template>
    <v-app-bar color="primary" class="text-white">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" ></v-app-bar-nav-icon>
        <router-link to="/" class="router-link"><v-toolbar-title>My App</v-toolbar-title></router-link>
        <v-spacer></v-spacer>
        <router-link to="/products" class="router-link" v-if="access"><v-btn text>Products</v-btn></router-link>
        <router-link to="/addProduct" class="router-link" v-if="access"><v-btn text>Add
                Product</v-btn></router-link>
        <router-link to="/displayProduct" class="router-link" v-if="access"><v-btn text>Product
                List</v-btn></router-link>
        <router-link to="/OrderList" class="router-link" v-if="access"><v-btn text>Order List</v-btn></router-link>
        <v-btn @click="logout" prepend-icon="mdi-logout">
            logout
        </v-btn>
        <v-btn class="text-none" stacked size="large" @click="this.$router.push('/cart')" v-if="access">
            <v-badge color="success" :content="cart.length">
                <v-icon size="large">mdi-cart</v-icon>
            </v-badge>
        </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary width="300">
        <v-list>
            <router-link to="/" class="router-link" >
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
            <router-link to="/addProduct" class="router-link" v-if="access">
                <v-list-item link>
                    <div class="d-flex">
                        <v-list-item-icon>
                            <v-icon>mdi-note-plus-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="margin-left: 10px !important;">Add Product</v-list-item-title>
                    </div>
                </v-list-item>
            </router-link>
            <router-link to="/displayProduct" class="router-link" v-if="access">
                <v-list-item link>
                    <div class="d-flex">
                        <v-list-item-icon>
                            <v-icon>mdi-format-list-bulleted</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="margin-left: 10px !important;">Product List</v-list-item-title>
                    </div>
                </v-list-item>
            </router-link>
            <router-link to="/cart" class="router-link" v-if="access">
                <v-list-item link>
                    <div class="d-flex">
                        <v-list-item-icon>
                            <v-icon>mdi-cart</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="margin-left: 10px !important;">Cart</v-list-item-title>
                    </div>
                </v-list-item>
            </router-link>
            <router-link to="/OrderList" class="router-link" v-if="access">
                <v-list-item link>
                    <div class="d-flex">
                        <v-list-item-icon>
                            <v-icon>mdi-format-list-bulleted-square</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="margin-left: 10px !important;">Order List</v-list-item-title>
                    </div>
                </v-list-item>
            </router-link>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
                <v-btn block color="error" class="mb-4" @click="logout" prepend-icon="mdi-logout">
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
