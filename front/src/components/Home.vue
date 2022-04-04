<template>
  <!--<el-scrollbar style="height:100%">-->
    <el-container>
    <el-aside width="740px">
      <div class = "first_text">
        Tame your study.
        Manage your life.
      </div>
      <div class = "first_text2">
        Remember everything and tackle any project with your notes, tasks, and schedule all in one place.
      </div>
      <el-button type="primary" @click="toRegister" class="form-confirm">Try Note² free</el-button>
      <div class = "first_text3">
      Key function supported: 
      </div>
      <div class = "first_text4">
      Markdown Notes | Rich Text |  Note Sharing | Note Management ｜Note recommendation
      </div>
    </el-aside>
    <el-main>
      <div>
          <img :src="imgUrl"   class = "first_pic" >
      </div>
      </el-main>
    </el-container> 
    <!---<div class="container">
     <svg viewBox="0 30 900 300" style="order: 1;">
        <symbol id="line-text">
          <text text-anchor="middle" x="50%" y="50%" dy="0.4em">
            Note² 
          </text>
        </symbol>
        <use xlink:href="#line-text" class="text"></use>
        <use xlink:href="#line-text" class="text"></use>
        <use xlink:href="#line-text" class="text"></use>
        <use xlink:href="#line-text" class="text"></use>
      </svg>
    </div>--->
  <!---</el-scrollbar>--->
</template>

<script>
import NavMenu from "./common/NavMenu";
    export default {
        name: "Home",
        data() {
        return {
          imgUrl:require("../assets/Home/login.jpg")
        }
        },
      components:{
        NavMenu
      },
      methods:{
        toRegister(){
          this.$router.replace('/register')
        },
      }
    }
</script>

<style scoped>
  .container {
    z-index: -1;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top:0;
    background-color:beige;
   /* background-image: url("../../../static/homeMask.png");*/
    /*background-image: url('../assets/Home/Header.png');*/
    /*background-image: url("../../../static/homeMask.png");*/
    /*background-size: 100%*/
    color:#000000;
    font-size: 100px;
    font-weight: bolder;
    text-transform: uppercase;
    margin-top: 15px;
  }
  .first_text {
    color:#000000;
    font-size: 70px;
    font-weight: bolder;
    margin-top: 100px;
    margin-left: 150px;
    text-align:left;
    line-height:80px;
    letter-spacing:0px;
  }
  .first_text2 {
    color:#525252;
    font-size: 20px;
    font-weight: bolder;
    margin-top: 20px;
    margin-left: 150px;
    text-align:left;
    line-height:40px;
    letter-spacing:0px;
  }
  .first_text3 {
    color:#525252;
    font-size: 13px;
    margin-top: 20px;
    font-weight: bolder;
    margin-left: 150px;
    text-align:left;
    line-height:40px;
    letter-spacing:0px;
    text-transform: uppercase;
  }
  .first_text4 {
    color:#525252;
    font-size: 13px;
    margin-top: -10px;
    font-weight: bolder;
    margin-left: 150px;
    text-align:left;
    line-height:40px;
    letter-spacing:0px;
  }
  .form-confirm{
    width: 30%;
    background-color: #e36767;
    border: 2px solid #e36767;
    border-radius: 4px;
    margin-top: 23px;
    margin-left: -220px;
    font-size: 15px;
  }
  .first_pic{
    margin-top: 25px;
    width:60%;
    height:100%;
    object-fit:contain;
    text-align:left;
    margin-left:-100px;

  }
  svg{
    position: fixed;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .text{
    fill: #000000;
    stroke-width: 5;
    stroke-dasharray: 0 240;
    stroke-dashoffset: 0;
  }
  .text:nth-child(4n+1){
    stroke:#000000;
    animation: text1 4s ease-in-out forwards;
  }
  .text:nth-child(4n+2){
    stroke:#000000;
    animation: text2 4s ease-in-out forwards;
  }
  .text:nth-child(4n+3){
    stroke:#000000;
    animation: text3 4s ease-in-out forwards;
  }
  .text:nth-child(4n+4){
    stroke:#000000;
    animation: text4 4s ease-in-out forwards;
  }
  @keyframes text1 {
    100% {
      stroke-dasharray: 60 180;
      stroke-dashoffset: 1000;
    }
  }
  @keyframes text2 {
    100% {
      stroke-dasharray: 60 180;
      stroke-dashoffset: 1060;
    }
  }
  @keyframes text3 {
    100% {
      stroke-dasharray: 60 180;
      stroke-dashoffset: 1120;
    }
  }
  @keyframes text4 {
    100% {
      stroke-dasharray: 60 180;
      stroke-dashoffset: 1180;
    }
  }

</style>
