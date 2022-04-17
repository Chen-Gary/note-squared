<template>
  <div class="nav-bar">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      router
      active-text-color="#25567A">

      <el-menu-item   v-for="(item,i) in navList" :index="item.url" :key="i">
        <el-image
        class="logo"
        :src="require('@/assets/Logo.png')"
        > </el-image>
        {{ item.name }}
      </el-menu-item>
       <el-menu-item>
         <el-button type="text" class = "router_button" @click="to_personal_center">Personal Center</el-button>
      </el-menu-item>

      <el-menu-item>
         <el-button type="text" class = "router_button" @click="to_community">Community</el-button>
      </el-menu-item>


    <li style="margin-right:2%; float:right; outline: none;cursor: pointer">
        <i class="el-icon-full-screen" style="font-size:30px;" @click="fullScreen"></i>
    </li>
    <li style="margin-right:2%; margin-top:0.5%;float:right; outline: none;cursor: pointer">
        <el-button type="text" class = "router_button" @click="note_log_out">Log out</el-button>
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
        /*if (window.localStorage.getItem("user") == null){
          this.userFlag.name = "Try Note² free"
          this.userFlag.menuList = [
            {url: '/register', name: 'Register'},
            {url: '/login', name: 'Login'},
          ]
          this.isLogin = 'none'
        }*/
      },

      methods: {
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
        },
        note_log_out(){
            localStorage.clear();
            this.$router.replace('/home');
        },
        to_personal_center()
        {
          if (localStorage.elementToken) this.$router.replace('/personal-center');
          else this.$router.replace('/login');
        },
        to_community()
        {
           if (localStorage.elementToken) this.$router.replace('/community');
           else this.$router.replace('/login');
        },
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
    margin-top: 0px;
    position:fixed;
    z-index:100;
  }
  .el-menu-item{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: bolder!important;
    font-size: 100%;
  }
  .router_button{
    font-weight: bolder!important;
    color: #000000;
  }
  .el-menu--horizontal>.el-menu-item {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height: 45px!important;
    line-height: 50px!important;
    font-size: 130%;
    color: #000000;
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 35px!important;
    line-height: 35px!important;
    color: #000000;
  }
  .logo{
    width: 30px!important;
    height: 30px!important;
    bottom: 10%;
  }
  .left_cornor_title{
    top: 0px;
    font-family: 'Bai Jamjuree';
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 38px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    color: rgba(0, 0, 0, 0.87);
  }
  .el-icon-full-screen{
    line-height: 50px!important;
  }



</style>
