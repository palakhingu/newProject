import { defineStore } from "pinia";
export const useNavbarStore = defineStore("navbar", {
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

