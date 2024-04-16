import { defineStore } from "pinia";
export const useAuthStore = defineStore("navbar", {
  state: () => ({
    isAuthenticated: !!localStorage.getItem("token"),
  }),
  actions: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("Userid");
      this.isAuthenticated = false;
    },
  },
});
