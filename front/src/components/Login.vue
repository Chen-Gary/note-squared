<template>
<div>
  <div class="container">

    <el-row class="form-body">
      <!--登录表单-->
      <div class="header_text"> Login </div>
      <el-form ref="form" :model="loginForm" :rules = "rules" label-width="0px">
        <el-form-item  class="form-item" prop = "username">
          <el-input placeholder="Email" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop = "password">
          <el-input placeholder="Password" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="onSubmit" class="form-confirm">Login</el-button>
        </el-form-item>
        <el-form-item>
          <div align="left" style="float:left" >
          <el-link :underline="false"  @click="toRegister">Have not have an account yet?</el-link>
          </div>
          <div align="right">
          <el-link :underline="false" @click="toForget">Forget password?</el-link>
          </div>
        </el-form-item>
      </el-form>
    </el-row>

  </div>
    <!--末尾版权文字-->
    <div style = "font-size: 12px">
     <div style="margin-top :35% ">
     © Setproduct.com. All rights reserved. The best time to plant a tree was 20 years ago. <br>The second best time is now.
      </div> 
    </div>
</div>
  
</template>

<script>
    import { Message } from 'element-ui';
    export default {
      name: "Login",
      data() {
        return {
          loginForm:{
            username:'',
            password:''
          },
          rules:{
            username:[{required:true, message:'Empty Email',trigger:'blur'},
                      {min:3,max:32,message:'The length is between 3 and 32',trigger:'blur'}
            ],
            password:[{required:true, message:'Empty password',trigger:'blur'},
                      {min:3,max:32,message:'The length is between 3 and 32',trigger:'blur'}
            ],
          }
        }
      },
      methods: {
        //登陆信息提交
        onSubmit(){
          var _this = this
          console.log(this.loginForm.username)
          console.log(this.loginForm.password)
          this.$axios.post("/user/login",{
            email:this.loginForm.username,
            password:this.loginForm.password,
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
              //分别跳转到笔记编辑或者管理者界面
              if (response.data.isAdmin) this.$router.replace('admin')
              else this.$router.replace('/note/edit')
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

        //转向注册界面
        toRegister(){
          this.$router.replace('/register')
        },
        toForget()
        {
          this.$router.replace('/forget')
        }
      }
    }
</script>

<style scoped>
  .container{
    height: 100%;
    width: 100%;
    /*background-image: url("../../static/homeMask.png");*/
   /* background-size: cover;
    position: fixed;
    left: 0px;
    top:0px;
    padding-top: 30px;*/
  }
  .form-body{
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    border-radius: 10px;
    margin: 0 auto;
    width: 27%;
    min-width: 300px;
    padding: 30px 30px 15px 30px;
    
    /*background-color: rgba(255,255,255,0.8);
    box-shadow: 5px 3px 10px rgba(0,0,0,0.9);*/
  }
  .form-confirm{
    width: 100%;
    height: 150%;
    background-color: #457DED;
   /* border: 2px solid #484848;*/
    border-radius: 4px;
    border-radius: 15px;
    font-weight: bolder;
  }
  .header_text{
    color:#4F586A ;
    font-size: 48px;
    font-weight: bolder;
    margin-top: -30%;
    margin-bottom: 10%;
    text-align: center;
    line-height:64px;
    letter-spacing:0px;
  }
</style>
