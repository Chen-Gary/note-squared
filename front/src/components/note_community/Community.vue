<template>
  <div class="community-page">

  <div class= "search_layout" >
    <el-row :gutter="20">
    <el-col :span="6"><div class="grid-content bg-purple">
            <el-button type="primary" :class = "button_color_index" @click="back_to_personal_center" icon ="el-icon-back" circle></el-button>
      </div>
    </el-col>
    <el-col :span="13"><div class="grid-content bg-purple">
      <span class="search_title" style = "margin-right:1%">
        Search
      </span>
        <el-input v-model="keyword" placeholder="Enjoy your journey ~" style="width: 30%"
        @keydown.enter.native = "searchEnterFun"></el-input>
      <el-button class="note_refresh" type="text" @click="refreshNote"><i class="el-icon-refresh"></i></el-button>
     </div>
    </el-col>
    </el-row>
  </div>

  <div>
    <CommunityList :items = "notes_info['note_obj'].list"/>
  </div>

  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="this.page.currentPage"
    :total="this.page.totalPage"
    layout="prev, pager, next"
    >
   </el-pagination>

  <br>
  <br>
  <br>
  </div>

</template>

<script>
import CommunityList from "./CommunityList";
export default {
  name:"Community",
  components:{
    CommunityList,
  },
  created()
  {
    this.UpdatePage();
  },
  data(){
    return {
      notes_info:{
        'note_obj' :{list:[ ]}, //object:标题,简介,点赞数,用户(谁上传的),对应的url link
      },
      keyword:localStorage.search_element,
      page:{
            currentPage:localStorage.community_page, //当前页
            pagesize:10,    // 每页的数据
            rows:1,         //总条数
            totalPage:5,  //总条数
      },
      mode:localStorage.community_mode, //当前搜索模式search，当前所有数据库模式all
    }
  },
  methods: {
    searchEnterFun(e)
    {
      this.mode = "search";//搜索模式
      localStorage.community_mode = "search";
      this.page.currentPage = 1;//调整页面为搜索的第一页
      localStorage.community_page = 1;
      var keycode = window.event? e.keyCode:e.which;
      localStorage.search_element = this.keyword;
      if (keycode == 13){
              console.log("press enter");
        this.search(); //回车键触发  搜索事件
      }
    },

    //搜索
    search(){
      this.$axios.get("/note/search-public?search="+this.keyword+"&page="+this.page.currentPage,{
        })
          .then(response=>{
            console.log("status:")
            console.log(response.data)
            let note_list = {}
            if(response.status === 200){
              this.tableData = []
              this.page.totalPage = response.data.pagesize * response.data.total;
              for (let i=0; i<response.data.notes.length; i++){
                let obj = response.data.notes[i];
                note_list[i] =  {title:obj.title, description:obj.description, thumb:obj.like,username:obj.publishDate.slice(0,10),url:obj._id };
              }
               this.notes_info.note_obj.list = note_list;
            }
            else {
              alert("Incorrect search operation")
            }
          })
          .catch(function (error) {
            alert("Incorrect search operation")
            console.log(error)
          })
    
    },
     

    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
        this.page.pagesize = size;
        console.log(this.page.pagesize)  //每页下拉显示数据
    },
    
    //点击分页最下面的页码时，更新其页码内容
    handleCurrentChange: function(currentPage){
        this.page.currentPage = currentPage;
        localStorage.community_page = currentPage;
        this.UpdatePage();
        console.log(this.page.currentPage)  //点击第几页
        this.scrollTop(".tabledns");
    },
    
    //更新界面，分为搜索模式或者整个笔记社区模式
    UpdatePage() {    
      if (this.mode === "search"){
        this.search();
      }
      else{
        this.show_all_note();
        this.keyword = ""
      }
        
    },

    //获取笔记社区所有笔记信息（笔记名，笔记上传时间，笔记点赞数，笔记描述，笔记ID等）
    show_all_note()
    {
        this.$axios.get("/admin/notelist/"+this.page.currentPage,{
        })
          .then(response=>{
            console.log("status:")
            console.log(response.data)
            let note_list = {}
            if(response.status === 200){
              this.tableData = []
              this.page.totalPage = response.data.pagesize * response.data.total;
              for (let i=0; i<response.data.notes.length; i++){
                let obj = response.data.notes[i];
                note_list[i] =  {title:obj.title, description:obj.description, thumb:obj.like,username:obj.publishDate.slice(0,10),url:obj._id };
              }
               this.notes_info.note_obj.list = note_list;
            }
            else {
              alert("Incorrect search operation")
            }
          })
          .catch(function (error) {
            alert("Incorrect search operation")
            console.log(error)
          })
    },
    //重新返回最开始所有数据库的页面，清空搜索栏
    refreshNote(){
      //清空搜索栏
      this.keyword = "";
      //清空回到数据库的第一页
      this.page.currentPage = 1;
      localStorage.community_page = 1;
      //模式转为所有笔记的返回
      this.mode = "all";
      localStorage.community_mode = "all";
      //所有数据库的返回
      this.show_all_note();
    },
    //跳转回personal center
    back_to_personal_center()
    {
      this.$router.replace('/personal-center')
    },
    // 翻页后滚动条回到页面顶端
    scrollTop (selector) {
      let element = selector && document.querySelector(selector) || window;
      element.scrollTo(0, 0);
    },



  },
}
</script>

<style scoped>
.community-page {
  overflow: hidden;
}
.search_title{
  font-size:30px;
  font-weight: bold;
}
.search_layout{
  margin-top:5%;
  margin-bottom: 3%;
}
.note_refresh{
  font-size: 25px;
  margin-left:10px;
}
</style>