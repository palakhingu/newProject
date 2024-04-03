import { createRouter, createWebHistory } from "vue-router";
import register from "../components/register.vue";
import login from "../components/login.vue";
import forgotPassword from "../components/forgotPassword.vue";
import Home from "@/components/home.vue";
import AddProduct from "@/components/addProduct.vue";

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
      name: "Add Product",
      component: AddProduct,
      meta: { requiresAuth: true },
    },
  ],
});

export default router;
