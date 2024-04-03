import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import AuthService from "@/services/AuthService";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import ApiService from "./services/ApiServices";
const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
});
app.use(router);
app.use(vuetify);
app.use(ToastPlugin, {
  position: "top-right",
});
app.config.globalProperties.$apiService = ApiService;

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!AuthService.getUserInfo()) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else if (to.fullPath == "/login") {
    if (AuthService.getUserInfo()) {
      next({
        path: "/home",
      })
    } else {
      next();
    }
  } else {
    next();
  }
});
app.mount("#app");
