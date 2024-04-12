import { createRouter, createWebHistory } from "vue-router";
import register from "../components/register.vue";
import login from "../components/login.vue";
import forgotPassword from "../components/forgotPassword.vue";
import Home from "@/components/home.vue";
import AddProduct from "@/components/addProduct.vue";
import DisplayProduct from "@/components/displayProduct.vue";
import Products from "@/components/Products.vue";
import ProductDetails from "@/components/productDetails.vue";
import cart from "@/components/cart.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "register",
      component: register,
    },
    {
      path: "/login",
      name: "login",
      component: login,
    },
    {
      path: "/forgotPassword",
      name: "forgotPassword",
      component: forgotPassword,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: "/addProduct",
      name: "AddProduct",
      component: AddProduct,
      meta: { requiresAuth: true },
    },
    {
      path: "/addProduct/:id",
      name: "updateProduct",
      component: AddProduct,
      meta: { requiresAuth: true },
    },
    {
      path: "/displayProduct",
      name: "displayProduct",
      component: DisplayProduct,
      meta: { requiresAuth: true },
    },
    {
      path: "/products",
      name: "Product",
      component: Products,
      meta: { requiresAuth: true },
    },
    {
      path: "/productDetails/:id",
      name: "ProductDetails",
      component: ProductDetails,
      meta: { requiresAuth: true },
    },
    {
      path: "/cart",
      name: "cart",
      component: cart,
      meta: { requiresAuth: true },
    },
  ],
});

export default router;
