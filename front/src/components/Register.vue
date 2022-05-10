<template>
    <div class="container">
      <div class="form-body">
        <div class = "header_text">Register</div>
        <el-form ref="form" :model="registerData" :rules = "rules"  label-width="0px">

          <el-form-item  class="form-item"  prop = "email">
            <el-input placeholder="Email" v-model="registerData.email"></el-input>
          </el-form-item>

          <el-form-item  prop = "password">
            <el-input placeholder="Password" v-model="registerData.password" show-password></el-input>
          </el-form-item>

          <el-form-item  prop = "password2">
            <el-input placeholder="Confirm password" v-model="registerData.password2" show-password></el-input>
          </el-form-item>

          <el-form-item  prop = "name">
            <el-input placeholder="Nickname" v-model="registerData.name"></el-input>
          </el-form-item>

          <el-form-item prop = "verification_code">
             <el-container>
                <el-input  style="width: 70%" placeholder="Verification code" v-model="registerData.verification_code"></el-input>
                <el-button 
                  v-show="sendCode"
                  style="margin-left: 10px; width: 30%"  
                  type="primary" 
                  @click="confirm_verfication_code" 
                  class="form-confirm"
                >Send</el-button> 
                <el-button 
                  v-show="!sendCode"
                  style="margin-left: 10px; width: 30%; border-radius: 15px;" 
                  type="primary" 
                  disabled 
                >({{counter}})</el-button> 
            </el-container>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="form-confirm">Create account</el-button>
          </el-form-item>
           <el-link :underline="false" @click="toLogin">Already have an account?</el-link>
        </el-form>
      </div>
    </div>

    
</template>


<script>
    export default {
      name: "Register",
     
      data() {
         //验证两次密码是否一致
        var validatePass = (rule, value, callback) =>{
        if (value != this.registerData.password){
          callback(new Error("Mismatched passwords!"));
        }
        else{
        callback();
        }
        };
        var checkEmail = (rule, value, callback) => {
          const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (regEmail.test(value)) {
            return callback();
          }
          callback(new Error("Please enter correct email!"));
        };
        return {
          //注册信息，邮箱，两次密码，用户名（name），验证码
          registerData:{
            email:'',
            password:'',
            password2:'',
            name:'',
            verification_code:''
          },
          //错误输入提示
          rules:{
            email:[{required:true, message:'Empty Email',trigger:'blur'},
                      {min:3,max:32,message:'The length is between 3 and 32',trigger:'blur'},
                      {validator: checkEmail}
            ],
            password:[{required:true, message:'Empty password',trigger:'blur'},
                      {min:3,max:32,message:'The length is between 3 and 32',trigger:'blur'}
            ],
            password2:[{required:true, message:'Empty confirm password',trigger:'blur'},
                      {min:3,max:32,message:'The length is between 3 and 32',trigger:'blur'},
                      {validator: validatePass, trigger:'blur'}
            ],
            name:[{required:true, message:'Empty nickname',trigger:'blur'},
                      {min:3,max:32,message:'The length is between 3 and 32',trigger:'blur'}
            ],
            verification_code:[{required:true, message:'Empty verification code',trigger:'blur'}
            ]
          },
          // count down
          sendCode: true,
          counter: 60,
          interCounter: null
        }
      },
      created() {
        //按验证码按钮之后倒计时
        if(window.sessionStorage.getItem("X_no_time")==null){
          this.sendCode = true
        }else{
          this.counter=Number(window.sessionStorage.getItem("X_no_time"));
          this.toLoading()
          this.sendCode = false
        }
      },
      methods: {
        //上交注册信息，等待验证码或者验证链接
        onSubmit(){
          var _this = this
          if(this.registerData.password !== this.registerData.password2){
            this.$message({
              message:'ERR: Two passwords do not match!',
              type:'error'
            })
            return
          }
          console.log(this.registerData.email)
          console.log(this.registerData.password)
          console.log(this.registerData.name)
          console.log(this.registerData.verification_code)
          //上传邮箱和密码，根据后端修改
          this.$axios.post("/user/register",{
            email:this.registerData.email,
            password:this.registerData.password,
            name:this.registerData.name,
            verificationCode:this.registerData.verification_code,
          })
          .then(res=> {
             // console.log("register info1:")
             // console.log(res)
             if(res.status === 200){
                console.log("register info:")
                console.log(res)
                Message.success("Successfully Register!")
                _this.$router.replace('/login')
                
            }
            else {
              alert("Email has been registered!")
            }
          })
          .catch(function (error) {
            console.log(error)
          })
          
        },
        //倒计时
        toLoading(){
          this.sendCode = false;
          this.interCounter = setInterval(this.fusn, 1000);
        }, 
        fusn(){
          this.counter--;
          window.sessionStorage .setItem("X_no_time", this.counter);
          if(window.sessionStorage .getItem("X_no_time")<="0"){
              window.sessionStorage .removeItem('X_no_time');
          }
          if(this.counter <= 0) {
                this.counter=60;
                this.sendCode = true;
                clearInterval(this.interCounter)
          }
        },
        //邮箱验证码验证
        confirm_verfication_code(){
          //通过验证       
          console.log(this.registerData.email);
          // counter loading
          this.toLoading()
          this.$axios.post("/user/register/email-verification-code",{
              email:this.registerData.email
          }).then(res=> {
            console.log("register info:")
            console.log(res);
           // _this.$router.replace('/login')
          })
          .catch(function (error) {
            console.log(error)
          })
        },
        //转回登陆界面
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
  }
  .form-confirm{
    width: 100%;
    height: 150%;
    background-color: #457DED;
    border-radius: 15px;
    font-weight: bolder;
  }
  .header_text{
    color:#4F586A ;
    font-size: 48px;
    font-weight: bolder;
    margin-top: 10%;
    margin-bottom: 5%;
    text-align: center;
    line-height:64px;
    letter-spacing:0px;
  }
</style>
