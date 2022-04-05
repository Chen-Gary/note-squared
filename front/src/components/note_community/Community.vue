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
  </div>

  <div>
    <CommunityList :items = "notes_info['note_obj'].list"/>
  </div>

  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :total="20"
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
            totalPage:5, //总页数
      },
    }
  },
  methods: {
    searchEnterFun(e)
    {
      var keycode = window.event? e.keyCode:e.which;
      if (keycode == 13){
              console.log("press enter");
        this.search(); //回车键触发  搜索事件
      }
      console.log(press);
    },

    //搜索，等待后端API
    search(){
      //要删除的
      this.notes_info.note_obj.list = [{title:"search", description:"it's a new note", thumb:"0",username:"Frida",url:"www.hello.com" }];
    },


    //https://www.bilibili.com/video/BV1hA41187dE?spm_id_from=333.337.search-card.all.click   47:21

    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
        this.page.pagesize = size;
        console.log(this.page.pagesize)  //每页下拉显示数据
    },
    
    handleCurrentChange: function(currentPage){
        this.page.currentPage = currentPage;
        this.handleUserList();
        console.log(this.page.currentPage)  //点击第几页
    },
    
    handleUserList() {    
      //等待后端完善所有每个页面
        this.notes_info.note_obj.list = [{title:"change page", description:"it's a new note", thumb:"0",username:"Frida",url:"www.hello.com" }];
        
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
</style>