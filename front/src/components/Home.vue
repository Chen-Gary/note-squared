<template>
 <!-- <el-scrollbar style="height:100%">-->
   <div class="container">
    <!---开头版面 + 登录注册按钮--->
    <div class="header-title">
      <div class = "first_text">
        Tame your study.<br>
        Manage your life.
      </div>
      <div class = "first_text2 typewriter-animation">
        Remember everything and tackle any project with your notes, tasks, and schedule!
      </div>
    </div>
    <div class="button-box">
      <div class="grid-content bg-purple">
        <el-button type="primary" @click="toLogin" class="register_button">LOGIN</el-button>
      </div>
      <div class="grid-content bg-purple-light">
        <el-button type="primary" @click="toRegister" class="login_button">REGISTER</el-button>
      </div>
    </div>
     <div>
        <img :src="imgUrl"   class = "first_pic" >
    </div>

    <!---三个简介--->
    <div class="feature-container">
      <div class = "feature_text">
          Features
      </div>
      <div>
        <el-col :span="12" style="margin-top :3%">
          <div class="grid-content bg-purple">
            <el-row :gutter="20">
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <img :src="imgIcon1"   class = "icon" >
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  <div class = "sub_feature_text">
                  Instant Markdown Note
                  </div>
                </div>
              </el-col>
            </el-row>

          <div class = "introduction">
            Support left-aligned typing with a wide range of
            fonts, sizes, and colors as well as a variety of
            auxiliary tool. Provide formatting for outlines
            and interactive list. Continuous page scroll inspires
            you to explore endless ideas.
          </div>

          </div>
        </el-col>

        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div class = "intro_pic">
              <img :src="imgUrl2" >
              </div>
          </div>
        </el-col>
      </div>
      <el-row style = "margin-top :3%">
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div class = "intro_pic2">
              <img :src="imgUrl3" >
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple" style="margin-top:2%">
            <el-row :gutter="20">
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <img :src="imgIcon2"   class = "icon2" >
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  <div class = "sub_feature_text2">
                  Note Management
                  </div>
                </div>
              </el-col>
            </el-row>

          <div class = "introduction2">
            Notes can be created, deleted, and <br>sorted easily
            with minimal steps and a <br>user-friendly UI system. 
            You can group <br>notes with customizable subjects and<br> 
            dividers. You can also set their own<br>note permissions,
            private or public.
          </div>
          </div>
        </el-col>
      </el-row>
      <el-row style = "margin-top :4%">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-row :gutter="20">
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <img :src="imgIcon3"   class = "icon" >
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  <div class = "sub_feature_text">
                  Note Community
                  </div>
                </div>
              </el-col>
            </el-row>

          <div class = "introduction">
            Note community is where users can upload 
            their notes and view others notes. You can 
            publish  notes for the world to see in the 
            note community through public note permissions. 
            You will receive comments and likes from other users. 
          </div>

          </div>
        </el-col>

        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div class = "intro_pic">
              <img :src="imgUrl4" >
              </div>
          </div>
        </el-col>
      </el-row>
    </div>



    <!---末尾版面--->
    <div class = "last_text" style="margin-top:20%">

      <div class = "same_align">
      <img :src="Logo" class="logo">
      <div style = "margin-left:1%">
        Note²
      </div>
      </div>



    </div>
   <div class = "last_text2">
     Shop  •  Reviews  •  Help  •  Returns  •  Story  •  Partnership  •  Refer a Friend
    </div>

    <div class>
       <img :src="imgUrl5" class = "supporter">
    </div>

   <div style = "font-size: 9px">
     <div style="margin-top:20px ">
     © Setproduct.com. All rights reserved. The best time to plant a<br> tree was 20 years ago. The second best time is now
    </div> 
   </div>

   <br>
   <br>
   <br>
   <br>
    </div>

  
</template>

<script>
import NavMenu from "./common/NavMenu";
import { Message } from 'element-ui';
    export default {
        name: "Home",
        data() {
        return {
          Logo:require("../assets/Logo.png"),

          imgUrl:require("../assets/Home/home_pic1.png"),
          imgUrl2:require("../assets/Home/home_pic2.png"),
          imgUrl3:require("../assets/Home/home_pic3.png"),
          imgUrl4:require("../assets/Home/home_pic4.png"),
          imgUrl5:require("../assets/Home/home_pic5.png"),


          imgIcon1:require("../assets/Home/Icon1.png"),
          imgIcon2:require("../assets/Home/Icon2.png"),
          imgIcon3:require("../assets/Home/Icon3.png"),
         // imgIcon4:require("../assets/Home/Icon4.png"),
        }
        },
      components:{
        NavMenu
      },
      methods:{
        toRegister(){
          this.$router.replace('/register')
        },
        toLogin(){
          //本地已经登录过
          if (localStorage.elementToken){
          this.$axios.get("/user/validate-token",{
          
          }).then(response=>{
            console.log(response)
             //自动登录，token有效
            if (response.data.isTokenValid){
                        if (localStorage.email && localStorage.password){
               this.$axios.post("/user/login",{
            email:localStorage.email,
            password:localStorage.password,
          })
          .then(response=>{
            console.log("status:")
            console.log(response.status)
            console.log(response.data)
            if(response.status === 200){
              console.log('login success')
              //弹窗显示
              Message.success("Successfully Login!")
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
          }
          //本地没有登录过
          else this.$router.replace('/login')
          }
          //token过期
          else{
            this.$router.replace('/login')
          }
        })
        }
        //本地没有登录过
        else{
          this.$router.replace('/login')
        }
        }
      }
    }
</script>

<style scoped>
  /*.first_text3.container {
    z-index: -1;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top:0;
    background-color:beige;
    background-image: url("../../../static/homeMask.png");
    background-image: url('../assets/Home/Header.png');
    background-image: url("../../../static/homeMask.png");
    background-size: 100%
    color:#000000;
    font-size: 100px;
    font-weight: bolder;
    text-transform: uppercase;
    margin-top: 15px;
  }*/
  .container {
    width: 100%;
    overflow: hidden;
    min-width: 960px;
  }
  .button-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .same_align{
    display:flex; 
    align-items:center;
    justify-content:center;
  }
  .supporter{
    width: 18%;
    height: 18%;
    margin-top:2%;
  }
  .logo{
    height: 5%;
    width: 5%;
  }
  .last_text {
    color:#4F586A ;
    font-size: 20px;
    font-weight: bolder;
    margin-top: 5%;
    text-align: center;
    line-height:51px;
    letter-spacing:0px;
  }
  .last_text2 {
    color:rgba(0, 0, 0, 0.87);
    font-size: 15px;
    font-weight: normal;
    margin-top: 15px;
    line-height:30px;
    letter-spacing:0.15px;
    text-align: center;
  }
  .header-text {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .first_text {
    color:#4F586A ;
    font-size: 48px;
    font-weight: bolder;
    margin-top: 60px;
    margin-bottom: 20px;
    text-align: center;
    line-height:64px;
    letter-spacing:0px;
  }
  .first_text2 {
    color:rgba(0, 0, 0, 0.87);
    font-size: 20px;
    font-weight: normal;
    margin: 0 auto;
    line-height: 30px;
    letter-spacing:0.15px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    border-right: 2px solid #eee;
  }
  .register_button{
    margin-top: 30px;
    margin-right: 48px;
    width: 176px;
    height: 48px;
    border-radius: 6px;
    background: #367BF5;
    /* Shadow Blue · 16dp */
    box-shadow: 0px 16px 24px rgba(54, 123, 245, 0.16), 0px 6px 12px rgba(54, 123, 245, 0.16);
    border-radius: 6px;
    font-size:14px;
  }
  .login_button{
    margin-top: 30px;
    /* margin-right: 70%; */
    width: 176px;
    height: 48px;
    border-radius: 6px;
    background: #ffffff;
    
    /* Shadow Blue · 16dp */
    /* box-shadow: 0px 16px 24px rgba(54, 123, 245, 0.16), 0px 6px 12px rgba(54, 123, 245, 0.16);*/
    border-radius: 6px;
    text-transform: uppercase;
    /* Blue Base */
    color: #367BF5;
    /* Shadow Blue · 8dp */
    text-shadow: 0px 8px 16px rgba(54, 123, 245, 0.1), 0px 4px 8px rgba(54, 123, 245, 0.16);
  }
  .first_pic{
    width: 905px;
    height: 557px;
    left: -41px;
    top: 262px;
    margin-top:1%;
  }
  .feature_text{
    color:#4F586A;
    font-size: 48px;
    font-weight: bolder;
    margin-left:20%;
    margin-top: 5%;
    text-align: start;
    line-height:51px;
    letter-spacing:0px;
  }
  .sub_feature_text{
    margin-top:2%;
    margin-left:45%;
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 38px;
    display: flex;
    align-items: center;
    letter-spacing: -0.01em;
    /* Dark Color */
    color: rgba(0, 0, 0, 0.87);

  }
  .icon{
    margin-left:265%;
    width: 72px;
    height: 72px;
    left: 24px;
    top: 8px;
  }
  .introduction{
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 40px;
/* or 150% */
    margin-left:55%; 
    letter-spacing: 0.15px;
    text-align: start;
  }
  .intro_pic{
    width: 80%;
    margin-right: 20%;
    margin-top :0%;
    top: -100px;
    align-content: overlap;
  }
  .icon2{
    margin-left:0%;
    width: 72px;
    height: 72px;
    left: 24px;
    top: 8px;
  }
  .sub_feature_text2{
    margin-top:2%;
    /* margin-left:0%; */
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 38px;
    display: flex;
    align-items: center;
    letter-spacing: -0.01em;
    /* Dark Color */
    color: rgba(0, 0, 0, 0.87);

  }
  .introduction2{
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 40px;
/* or 150% */
    margin-left:18%; 
    letter-spacing: 0.15px;
    text-align: start;
  }
  .intro_pic2{
    width: 80%;
    margin-left: 30%;
    margin-top :0%;
    top: -100px;
    align-content: overlap;
  }
  .typewriter-animation {
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    animation: grow 6s steps(80) 1s normal both, 
    blink 0.8s steps(80) infinite normal;
  }
  @keyframes grow {
    from {
      width: 0;
    }
    to {
      width: 760px;
    }
  }

  @keyframes blink {
    from {
      border-right-color: #eee;
    }
    to {
      border-right-color: #222;
    }
  }



</style>
