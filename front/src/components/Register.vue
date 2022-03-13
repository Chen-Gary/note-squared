<template>
    <div class="container">
      <div class="form-body">
        <h2>Register</h2>
        <el-form ref="form" :model="registerForm" label-width="0px">

          <el-form-item  class="form-item">
            <el-input placeholder="Email" v-model="registerForm.Email"></el-input>
          </el-form-item>

          <el-form-item>
            <el-input placeholder="Password" v-model="registerForm.password" show-password></el-input>
          </el-form-item>

          <el-form-item>
            <el-input placeholder="Confirm password" v-model="registerForm.passwordConfirm" show-password></el-input>
          </el-form-item>

          <el-form-item>
             <el-container>
               <el-input  style="width: 70%" placeholder="Verification code" v-model="registerForm.verification_code"></el-input>
               <el-button style="width: 30%" type="primary" @click="onSubmit" class="form-confirm">Send</el-button> 
            </el-container>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="form-confirm">Create account</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toLogin" class="form-confirm">Log in</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    
</template>


<script>
    export default {
      name: "Register",
      data() {
        return {
          registerForm:{
            Email:'',
            password:'',
            passwordConfirm:'',
            verification_code:'',
          }
        }
      },
      methods: {
        onSubmit(){
          var _this = this
          if(this.registerForm.password !== this.registerForm.passwordConfirm){
            this.$message({
              message:'Two password does not match',
              type:'error'
            })
            return
          }

          //上传邮箱和密码，根据后端修改
          this.axios.post("/register",{
            username:this.registerForm.Email,
            password:this.registerForm.password
          })
          .then(function (response) {
            _this.$router.replace('/login')
          })
          .catch(function (error) {
            console.log(error)
          })
        },

        toLogin(){
          this.$router.replace('/login')
        }
      }

    }
</script>

<style scoped>
  .container{
    height: 100%;
    width: 100%;
   /* background-image: url("../../static/homeMask.png");*/
    background-size: cover;
    position: fixed;
    left: 0px;
    top:0px;
  }
  .form-body{
    border-radius: 10px;
    margin: 100px auto auto;
    width: 25%;
    min-width: 200px;
    padding: 30px 30px 15px 30px;
    background-color: rgba(255,255,255,0.8);
    box-shadow: 5px 3px 10px rgba(0,0,0,0.9);
  }
  .form-confirm{
    width: 100%;
    background-color: #585858;
    border: 2px solid #484848;
    border-radius: 4px;
  }
</style>
