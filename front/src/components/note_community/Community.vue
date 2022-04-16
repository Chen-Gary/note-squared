<template>
  <div>

  <div class= "search_layout" >
      <span class="search_title" style = "margin-right:1%">
        Search
      </span>
      <span>
        <el-input v-model="keyword" placeholder="Enjoy your journey ~" style="width: 30%"
        @keydown.enter.native = "searchEnterFun"></el-input>
     </span>
     <span>
      <el-button class="note_refresh" type="text" @click="refreshNote"><i class="el-icon-refresh"></i></el-button>
     </span>
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
    //更新数据库的notes列表
     let obj = {title:"note1", description:"it's a new note", thumb:"0",username:"Frida",url:"www.hello.com" }
     this.notes_info.note_obj.list.push(obj);
     this.notes_info.note_obj.list.push({title:"note2", description:"it's a new note", thumb:"0",username:"Frida",url:"www.hello.com" });
     this.notes_info.note_obj.list.push({title:"note3", description:"it's a new note", thumb:"0",username:"Frida",url:"www.hello.com" });
     this.notes_info.note_obj.list.push({title:"note4", description:"it's a new note", thumb:"0",username:"Frida",url:"www.hello.com" });
     this.notes_info.note_obj.list.push({title:"note5", description:"it's a new note", thumb:"0",username:"Frida",url:"www.hello.com" });
     this.notes_info.note_obj.list.push({title:"note6", description:"it's a new note", thumb:"0",username:"Frida",url:"www.hello.com" });
  },
  data(){
    return {
      notes_info:{
        'note_obj' :{list:[ ]}, //object:标题,简介,点赞数,用户(谁上传的),对应的url link
      },
      keyword:"",
      page:{
            currentPage:1, //当前页
            pagesize:10,    // 每页的数据
            rows:1,         //总条数
            totalPage:5,  //总条数
      },
      mode:"search", //当前搜索模式search，当前所有数据库模式all
    }
  },
  methods: {
    searchEnterFun(e)
    {
      this.mode = "search";//搜索模式
      this.page.currentPage = 1;//调整页面为搜索的第一页
      var keycode = window.event? e.keyCode:e.which;
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
     
    //https://www.bilibili.com/video/BV1hA41187dE?spm_id_from=333.337.search-card.all.click   47:21

    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
        this.page.pagesize = size;
        console.log(this.page.pagesize)  //每页下拉显示数据
    },
    
    handleCurrentChange: function(currentPage){
        this.page.currentPage = currentPage;
        this.UpdatePage();
        console.log(this.page.currentPage)  //点击第几页
    },
    
    UpdatePage() {    
      if (this.mode == "search"){
        this.search();
      }
      //等待后端完善所有数据库的返回
      else{

      }
        
    },
    //重新返回最开始所有数据库的页面，清空搜索栏
    refreshNote(){
      //清空搜索栏
      this.keyword = "";
      //清空回到数据库的第一页
      this.page.currentPage = 1;
      //等待后端完善所有数据库的返回
    }

  },
}
</script>

<style>
.search_title{
  font-size:30px;
  font-weight: bold;
}
.search_layout{
  margin-top:3%;
  margin-bottom: 3%;
}
.note_refresh{
  font-size: 25px;
  margin-left:10px;
}
</style>