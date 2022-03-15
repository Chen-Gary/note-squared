<template>
  <div>
    <NavBar></NavBar>
    <router-view/>
  </div>
</template>

<script>
  import NavMenu from "./common/NavMenu";
    export default {
      name: "HomeNavBar",
      components:{
        "NavBar":NavMenu
      }
    }
</script>

<style scoped>

</style>
