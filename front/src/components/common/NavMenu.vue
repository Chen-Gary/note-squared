<template>
  <div class="nav-bar">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      router
      active-text-color="#25567A">

      <el-menu-item @click="to_home">
        <el-image
        class="logo"
        :src="require('@/assets/Logo.png')"
        > </el-image>
        Note²
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
       <el-button type="text" class = "router_button" @click="note_log_out">{{this.login_status}}</el-button>

    </li>


    </el-menu>
  </div>
</template>

<script>
    export default {
      name: "NavMenu",
      data() {
        return {
          url: "../../assets/Logo.png",  //navbar 图标
          isLogin:'none',   
          userFlag: {       //存放一些用户信息
            name: '',
            menuList: []
          },
          login_status_from_page:$arguments,
          navList: [
            {name: 'Note²', url: '/home'},
          ],
          
          login_status:"Log In"
        };
      },

      mounted() {
        console.log("login status")
        if (window.localStorage.getItem("email") != null )  //如果localstorage有存放信息，自动登录
        {
          this.login_status = "Log Out"
        }
        else{
          this.login_status = "Log In"
        }
      },

      methods: {
        fullScreen(ev) {   //全屏按钮
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
        note_log_out(){    //退出登录，回到home界面
            if (this.login_status == "Log Out"){
              localStorage.clear();
              this.$router.replace('/home');
              this.login_status = "Log In"
            }
            else {
                this.$router.replace('/login');
            }
        },
        auto_login(){   //登录，和后端相连接
          this.$axios.post("/user/login",{
            email:localStorage.email,
            password:localStorage.password,
          })
          .then(response=>{
            console.log("status:")
            console.log(response.data)
            if(response.status === 200){
              console.log('login success')
              //弹窗显示
              Message.success("Successfully Login!")
              localStorage.setItem('id',response.data._id)
              localStorage.setItem('elementToken', response.data.jwt)
              localStorage.setItem('email',this.loginForm.username)
              localStorage.setItem('password',this.loginForm.password)
              localStorage.community_page = 1
              localStorage.community_mode = "all"
              localStorage.search_element = ""
              //分别跳转到笔记编辑或者管理者界面
              if (response.data.isAdmin) this.$router.replace('admin')
              else this.$router.replace('/personal-center')
            }
            else {
              alert("Incorrect email or password")
            }
          })
          .catch(function (error) {
            alert("Incorrect email or password")
            console.log(error)
          })
        },
        to_personal_center() //跳转到personal center
        {
          if (localStorage.elementToken) this.$router.replace('/personal-center');
          else this.$router.replace('/login');
        },
        to_community()  //跳转到note community
        {
           if (localStorage.elementToken) this.$router.replace('/community');
           else this.$router.replace('/login');
        },
        to_home() {    //跳转到home
          this.$router.replace('/home')
        }
      }
    }

</script>

<style scoped>
  .nav-bar{
    width: 100%;
    left: 0px;
    top: 0px;
    margin: 0%;
    line-height:10px;
    margin-top: 0px;
    position:fixed;
    z-index:100;
    /* height: 50px; */
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
