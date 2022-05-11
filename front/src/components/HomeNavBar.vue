<template>
  <div class="body">
    <nav-menu></nav-menu>
    <router-view />
  </div>
</template>

<script>
//navbar，导航栏component
import NavMenu from "./common/NavMenu";
export default {
  name: "HomeNavBar",
  components: {
    NavMenu,
  },
};
</script>

<style scoped></style>
