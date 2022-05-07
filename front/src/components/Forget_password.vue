 <template>
    <div class="container">
      <div class="form-body">
        <div class = "header_text">Forget Password</div>
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
            <el-button type="primary" @click="onSubmit" class="form-confirm">Change password</el-button>
          </el-form-item>

          <el-form-item>
          <div align="left" style="float:left" >
          <el-link :underline="false"  @click="toLogin">Remember password?</el-link>
          </div>
          <div align="right">
          <el-link :underline="false" @click="toRegister">Have not have an account yet?</el-link>
          </div>
          </el-form-item>

        </el-form>
      </div>
    </div>

    
</template>


<script>
    export default {
      name: "Forget_password",
     
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
                      {min:3,max:32,message:'The length is between 3 and 32',trigger:'blur'}
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
          sendCode: false,
          counter: 60,
          interCounter: null
        }
      },
      created() {
        if(window.sessionStorage.getItem("forget_time")==null){
          console.log("initial no status")
          this.sendCode = true
        }else{
          this.counter=Number(window.sessionStorage.getItem("forget_time"));
          console.log("have status and is: ", this.counter)
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
          //上传邮箱和密码，根据后端修改
          this.$axios.post("/user/set-pwd/email/set",{
            email:this.registerData.email,
            newPwd:this.registerData.password,
            verificationCode:this.registerData.verification_code,
          })
          .then(res=> {
            console.log("register info:")
            console.log(res)
            if(res.status === 200){
              Message.success("Successfully change the password!")
              this.$router.replace('/login')
              console.log('change password success')
            }
           // _this.$router.replace('/login')
          })
          .catch(function (error) {
            console.log(error)
          })
          
        },
        toLoading(){
          this.sendCode = false;
          console.log("enter loading")
          this.interCounter = setInterval(this.fusn, 1000);
        }, 
        fusn(){
          this.counter--;
          console.log("enter fusn")
          window.sessionStorage .setItem("forget_time", this.counter);
          if(window.sessionStorage .getItem("forget_time")<="0"){
              console.log("enter fusn if")
              window.sessionStorage .removeItem('forget_time');
          }
          if(this.counter <= 0) {
                this.counter=60;
                this.sendCode = true;
                console.log("enter fusn else")
                clearInterval(this.interCounter)
          }
        },
        //邮箱验证码验证
        confirm_verfication_code(){
          this.toLoading()
          //通过验证       
          this.$axios.post("/user/set-pwd/email/verification-code",{
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
        },
        toRegister()
        {
          this.$router.replace('/register')
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
    margin-top: 10%;
    margin-bottom: 7%;
    text-align: center;
    line-height:64px;
    letter-spacing:0px;
  }
</style>
