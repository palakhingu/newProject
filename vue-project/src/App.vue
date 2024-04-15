<script>
import navbar from "./components/navbar.vue";
export default {
  components: {
    navbar,
  },
};
</script>
<template>
  <v-app>
    <navbar />
    <router-view></router-view>
  </v-app>

</template>

<style scoped></style>
