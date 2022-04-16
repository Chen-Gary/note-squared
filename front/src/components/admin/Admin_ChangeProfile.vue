.<template>
<div>
<el-card>
  <el-button class="note-operation" type="info" plain @click="log_out" style="margin-right:-90%">Log out</el-button>
  <h1>User Profile Management</h1>
  <!--
  <el-row class = "search_box">
    <el-col >
      <el-input v-model="search_keyword" style="width: 30%"></el-input>
      <el-button type="primary" icon="el-icon-search" style="margin-left:1%">Search</el-button>
    </el-col>
  </el-row>-->
  <br>
  <el-table
    :data="tableData"
    border
    style="width: 100%" >
    <el-table-column  
    :width="item.width"
    :prop="item.prop" 
    :label="item.label" 
    v-for="(item,index) in option" 
    :key = "index">
    <template v-slot = "{row}" v-if ="item.prop === 'role'">
      <el-switch v-model = "row.role" active-text="admin" @change = "change_admin_state(row)"></el-switch>
    </template>
    <template #default = "{row}" v-else-if="item.prop === 'action' " >
      <el-button type = "primary" size = 'small' @click="handleDialogValue(row)"> Edit </el-button>
    </template> 
    </el-table-column>
    
  </el-table>


    <el-pagination
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :total="page.totalPage"
    layout="prev, pager, next"
    >
   </el-pagination>
  </el-card>
  
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogVisible = false">
      <span><el-form ref="form" :model="form" label-width="80px" width:200px>

      <el-tabs v-model="activeName" style="text-align: center" stretch>

        <el-tab-pane label="Change Password" name="first" >
          <br>
              <el-form-item label="Password" >
                <el-input v-model="form.password" ></el-input>
              </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="Change Others" name="second" >
          <br>
              <el-form-item label="Email">
                <el-input v-model="form.email" ></el-input>
              </el-form-item>
              <el-form-item label="Nickname">
                <el-input v-model="form.name" ></el-input>
              </el-form-item>
        </el-tab-pane>
      </el-tabs>

    </el-form></span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="handleConfirm">Save</el-button>
    </span>
    </el-dialog>
  </div>

</div>
</template>

<script>
import {options} from './options.js'
import { Message } from 'element-ui';
export default {
  name:"Admin_ChangeProfile",
  created(){
    this.ChangeUserList();
  },
  data() {
      return {
      search_keyword:"",
      tableData: [],
      currentPage: 1,
      page:{
            currentPage:1, //当前页
            pagesize:10,    // 每页的数据
            rows:1,         //总条数
            totalPage:5, //总页数
      },
      option:options,
      dialogVisible:false,
      form:{
        _id:"",
        name:"",
        password:"",
        role:"",
        email:"",
      },
      activeName:"first",
      }
    },
    methods:{
    handleSizeChange: function (size) {
        this.page.pagesize = size;
        console.log(this.page.pagesize)  //每页下拉显示数据多少条，默认10条，所以不需要这个函数
    },
    
    handleCurrentChange: function(currentPage){
        this.page.currentPage = currentPage;
        this.ChangeUserList();
        console.log(this.page.currentPage)  //点击第几页
    },

    handleDialogValue:function(row)
    {
      this.dialogVisible = true
      this.form._id = row._id
      this.form.name = row.name
      this.form.email = row.email
      let state = ""
      if (row.role) state = "admin"
      else state = "normal"
      this.form.role = state
    },

    handleConfirm(){
      this.dialogVisible = false;
      //如果更改的是密码
      console.log(this.activeName)
      if(this.activeName == "first")
      {
        console.log(this.form._id)
        console.log(this.form.password)
          this.$axios.post("/admin/password-edit",{
          _id : this.form._id,
          newPwd: this.form.password,
        }).then(response=>{
          console.log("response")
          console.log(response)
          if (response.status === 200)
          {
              this.$message({
              message: 'Successfully change the password!',
              type: 'success'
              }); 
              this.ChangeUserList()
          }
          else{
            this.$message.error({
              message: 'Fail to change the password!',
              });
          }

        })
      }
      //更改邮箱或者姓名
      else{
        this.$axios.post("/admin/profile-edit",{
          headers: {Authorization:localStorage.elementToken},
          _id : this.form._id,
          email : this.form.email,
          name : this.form.name,
          role : this.form.role,
        }).then(response=>{
          console.log("response")
          console.log(response)
          if (response.status === 200)
          {
              this.$message({
              message: 'Successfully change the information!',
              type: 'success'
              });
              this.ChangeUserList()
          }
          else{
            this.$message.error({
              message: 'Fail to change the information!',
              });
          }

        })

      }
    },
    change_admin_state(row){
      let state = ""
      if (row.role) state = "admin"
      else state = "normal"
          this.$axios.post("/admin/profile-edit",{
          headers: {Authorization:localStorage.elementToken},
          _id : row._id,
          email : row.email,
          name : row.name,
          role : state,
        }).then(response=>{
          console.log("response")
          console.log(response)
          if (response.status === 200)
          {
              this.$message({
              message: 'Successfully change the role!',
              type: 'success'
              });
          }
          else{
            this.$message.error({
              message: 'Fail to change the role!',
              });
          }

        })
      
    },
    ChangeUserList: function() {    
      //等待后端完善所有每个页面
       // console.log(localStorage.elementToken)
        this.$axios.get("/admin/userlist/"+this.page.currentPage,{
          headers: {Authorization:localStorage.elementToken},
        })
          .then(response=>{
            
            console.log("status:")
            console.log(response.data)
            if(response.status === 200){
              this.tableData = []
              this.page.totalPage = response.data.pagesize * response.data.total;
              let convert_data = response.data.users;
              convert_data.forEach((item) => {
                  if (item.role == 'admin') {
                    let obj = {
                      _id: item._id,
                      email:item.email,
                      name:item.name,
                      password:item.password,
                      role:true,
                    }

                    this.tableData.push(obj)
                  }
                  else{
                    let obj = {
                      _id: item._id,
                      email:item.email,
                      name:item.name,
                      password:item.password,
                      role:false,
                    }
                    this.tableData.push(obj)
                  }
              });
            }
            else {
              alert("Incorrect email or password")
            }
          })
          .catch(function (error) {
            alert("some error occur, can not receive")
            console.log(error)
          })
    
      },
    },
    log_out()
    {
        localStorage.clear();
        this.$router.replace('/home');
    }
}
</script>

<style>
.search_box{
  width: 80%;
  height: 100%;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin:auto;
}
</style>