<template>
  <div class="nav-bar">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      router
      active-text-color="#25567A">

      <el-menu-item  v-for="(item,i) in navList" :index="item.url" :key="i">
        <el-image
        style="width: 35px; height: 35px"
        :src="require('@/assets/Logo2.png')"
        > </el-image>
        {{ item.name }}
      </el-menu-item>

      <el-submenu style="float:right;">
        <template slot="title">{{userFlag.name}}</template>

        <el-menu-item v-for="(item,i) in userFlag.menuList" :index="item.url" :key="i">{{item.name}}</el-menu-item>
        <el-menu-item :style="{display:isLogin}"
                      @click="logout">Log out</el-menu-item>
      </el-submenu>

    <li style="float: right;outline: none;cursor: pointer">
        <i class="el-icon-full-screen" style="font-size:30px; top = 0px; margin: 0%; height: 35px; line-height: 35px;" @click="fullScreen"></i>
      </li>


    </el-menu>
  </div>
</template>

<script>
    export default {
      name: "NavMenu",
      data() {
        return {
          url: "../../assets/Logo.png",
          isLogin:'none',
          userFlag: {
            name: '',
            menuList: []
          },

          navList: [
            {name: 'Note²', url: '/home'},
          ],
        };
      },

      mounted() {
        //如果local storage有存，读取后自动登录
       /* if (window.localStorage.getItem("user") != null) {
          this.userFlag.name = JSON.parse(window.localStorage.getItem("user")).username
          this.userFlag.menuList = [
            {url: '/home', name: '用户中心'},
            {url: '/home', name: '笔记管理'},
          ]
          this.isLogin = 'inline-block'
        } else {*/
        if (window.localStorage.getItem("user") == null){
          this.userFlag.name = "Try Note² free"
          this.userFlag.menuList = [
            {url: '/register', name: 'Register'},
            {url: '/login', name: 'Login'},
          ]
          this.isLogin = 'none'
        }
      },

      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath)
        },
        logout(){
          var _this = this
          this.axios.get('/logout')
          .then(function (response) {
            if(response.data.status === 200){
              _this.$store.commit('logout')
              _this.$router.replace('/login')
            }
          })
          .catch(function (error) {
            console.log(error)
          })

        },
        fullScreen(ev) {
          const isFull=!!(document.webkitIsFullScreen || document.mozFullScreen ||
            document.msFullscreenElement || document.fullscreenElement
          )
          if(!isFull){
            var element = document.documentElement;
            if (element.requestFullscreen) {
              element.requestFullscreen()
            } else if (element.msRequestFullscreen) {
              element.msRequestFullscreen()
            } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen()
            } else if (element.webkitRequestFullscreen) {
              element.webkitRequestFullscreen()
            }
          }
          else{
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            }
          }
        }
      }
    }

</script>

<style>
  .nav-bar{
    width: 100%;
    left: 0px;
    top: 0px;
    margin: 0%;
    line-height:10px;
    margin-top: 15px;
  }
  .el-menu-item{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: bolder!important;
    font-size: 100%;
  }
  .el-menu--horizontal>.el-menu-item {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height: 35px!important;
    line-height: 35px!important;
    font-size: 130%;
    color: #000000;
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 35px!important;
    line-height: 35px!important;
    color: #000000;
  }

</style>
