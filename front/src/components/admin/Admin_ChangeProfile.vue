.<template>
<el-card>
  <el-row class = "search_box">
    <el-col >
      <el-input v-model="search_keyword" style="width: 30%"></el-input>
      <el-button type="primary" icon="el-icon-search" style="margin-left:1%">Search</el-button>
    </el-col>
  </el-row>
  <br>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>


    <el-pagination
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :total="20"
    layout="prev, pager, next"
    >
   </el-pagination>
  </el-card>
</template>

<script>
export default {
  name:"Admin_ChangeProfile",
  data() {
      return {
        search_keyword:"",
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],

      page:{
            currentPage:1, //当前页
            pagesize:10,    // 每页的数据
            rows:1,         //总条数
            totalPage:5, //总页数
      },
      }
    },
    methods:{
    handleSizeChange: function (size) {
        this.page.pagesize = size;
        console.log(this.page.pagesize)  //每页下拉显示数据
    },
    
    handleCurrentChange: function(currentPage){
        console.log(localStorage.elementToken)
        this.page.currentPage = currentPage;
      //  this.tableData[0].date = "2020-03-01"
       // this.handleUserList();
      //  console.log(this.page.currentPage)  //点击第几页
    },
    
    handleUserList() {    
      //等待后端完善所有每个页面
        console.log(localStorage.elementToken)
        this.$axios.post("/admin/userlist/1",{
        //  headers: {Authorization:"Bearer "+localStorage.elementToken},
        })
          .then(response=>{
            
            console.log("status:")
            console.log(response.data.status)
            console.log(response.data)
            if(response.status === 200){
              console.log('login success')
              //弹窗显示
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