.<template>
<el-card>
  <h1>User Profile Management </h1>
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
    <template #default v-if="item.prop === 'action' " >
    <template>
      <el-button type = "primary" size = 'small' > Edit </el-button>
      </template> 
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
</template>

<script>
import {options} from './options.js'
export default {
  name:"Admin_ChangeProfile",
  created(){
    this.handleUserList();
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
      row_info: {
        id :"",
        email:"",
        name:"",
        password:"",
      },
      }
    },
    methods:{
    handleSizeChange: function (size) {
        this.page.pagesize = size;
        console.log(this.page.pagesize)  //每页下拉显示数据
    },
    
    handleCurrentChange: function(currentPage){
        this.page.currentPage = currentPage;
        this.ChangeUserList();
        console.log(this.page.currentPage)  //点击第几页
    },
    edit_info:function(row)
    {

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
              console.log('login success')
              this.tableData = response.data.users;
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

     handleUserList() {    
      //等待后端完善所有每个页面
       // console.log(localStorage.elementToken)
        this.$axios.get("/admin/userlist/1",{
          headers: {Authorization:localStorage.elementToken},
        })
          .then(response=>{
            
            console.log("status:")
            console.log(response.data)
            if(response.status === 200){
              console.log('login success')
              this.tableData = response.data.users;
              this.page.totalPage = response.data.total * response.data.pagesize;
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