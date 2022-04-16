<template>
  <div class="page-container">  
      <div class="main-content">
        <div class="user-info">Some User Info Here</div>
        <div class="markdown-body" id="markdown-content">
          <VueMarkdown :source="value" v-highlight></VueMarkdown>
        </div>
        <div class="interface-box">
          <!-- 添加v-if 如果是自己的文章则没有 -->
          <el-button type="primary" :class = "button_color_index" @click="like_notes" icon ="el-icon-caret-top" circle style="font-size: 15px;"></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
          <p>{{liked_status}}</p>
        </div>
        <el-divider>END</el-divider>
        <div class="comments-area">
          <div class="post-comment">
            <el-image
              style="width: 50px; height: 50px"
              :src="url"
              :fit="fit"></el-image>
            <div class="coments-textarea">
              <el-input 
                class="comment-input"
                v-model="comment"
                placeholder="Please enter your comments..."
                maxlength="140"
                show-word-limit
                type="textarea" 
              ></el-input>
              <div class="post-button">
                <el-button size="medium">Post</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sidebar">
        test
      </div>
  </div>  
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  components: {
    VueMarkdown // 注入组件
  },
  created()
  {
    //更新当前页面note信息
   // this.get_note_info();
    this.get_note_recommendation();
  },
  data () {
    return {
      liked_status :"Like\xa0\xa0\xa0\xa0\xa0\xa0Fork",
      note_id:"625a74502f879603b077f003",//note id暂时是这个！！会更改
      note_author:"",
      note_avatar:"",
      note_title:"",
      note_description:"",
      note_content:"",
      note_like:0,
      note_isLiked:false,
      note_isMe:false,
      button_color_index:"button_bgcolor",//0默认，1有数值
      recommendation_list:[],
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', 
      comment: "",
      value: "# test\n```java\npublic class Test {\n\tpublic static void testFunc() {\n\t\tSystem.out.println(\"hi\");\n\t}\n}\n```\ntest content" // value的值是要解析的markdown数据
    }
  },
  methods:{
    get_note_info(){
       this.$axios.get("/note/note-get/" + this.note_id,{
        }).then(response=>{
          console.log(response)
          if (response.status === 200)
          {
              this.note_author = response.data.user.name;
              this.note_description = response.data.noteData.description;
              this.note_like = response.data.noteData.like;
              this.note_title = response.data.noteData.title;
              this.note_isMe = response.data.noteData.isMe;
              this.note_isLiked = response.data.isLiked;
              this.note_id = response.data.noteData._id;//id应该原来就有，可以删除
              this.avatar = 'http://localhost:3000' + response.data.user.avatar;
              console.log(this.isLiked)
              if (this.note_isLiked) 
              {
                this.button_color_index = "button_bgcolor2"//已经喜欢过了
                this.liked_status = "Liked\xa0\xa0\xa0\xa0\xa0\xa0Fork"
              }
              else {
                this.button_color_index = "button_bgcolor"
                this.liked_status = "Like\xa0\xa0\xa0\xa0\xa0\xa0Fork"
              }
          }
          else{
            this.$message.error({
              message: 'Fail to get note info!',
            });
          }
        })
      },
      like_notes(){
      //this.get_note_info()
      let mode = "like"
      if (this.note_isLiked) mode = "dislike"
      if (!this.note_isLiked) 
            {
                this.button_color_index = "button_bgcolor2"//已经喜欢过了
                this.liked_status = "Liked\xa0\xa0\xa0\xa0\xa0\xa0Fork"
            }
            else {
                this.button_color_index = "button_bgcolor"
                this.liked_status = "Like\xa0\xa0\xa0\xa0\xa0\xa0Fork"
      }
      this.$axios.post("/note/like-note",{
        mode:mode,
        noteId:this.note_id,
        }).then(response=>{
          if (response.status === 200)
          {
            this.note_isLiked = !this.note_isLiked;
            console.log(response)
          }
          else{
            this.$message.error({
            message: 'Fail to get note info!',
            });
          }
        })
    },
    note_fork()
    {
      this.$axios.post("/note/fork-note",{
        mode:mode,
        noteId:this.note_id,
        }).then(response=>{
          if (response.status === 200)
          {
            this.note_isLiked = !this.note_isLiked;
            console.log(response)
          }
          else{
            this.$message.error({
            message: 'Fail to get note info!',
            });
          }
        })
    },
    get_note_recommendation:function()
    {
       this.$axios.get("/note/recommendation-get",{
        }).then(response=>{
          console.log(response)
          if (response.status === 200)
          {
            let array = []
            let obj = {note_id:"", title:""}
            for (let i=0; i<response.data.list.length; i++){
              obj.note_id = response.data.list[i].noteId
              obj.title = response.data.list[i].title
              array[i] = obj;
            }
            this.recommendation_list = array;
            console.log(this.recommendation_list)
          }
          else{
            this.$message.error({
              message: 'Fail to get note recommendation!',
            });
          }
        })
    },
    },
  
}
</script>

<style >
.button_bgcolor {
     background-color: #cce0ff;
     color:#3d83ec;
     border: 0;
     outline: none;
     font-size: 15px;
 }
 .button_bgcolor2 {
     background-color: #3d83ec;
     color:#ffffff;
     border: 0;
     outline: none;
     font-size: 15px;
 }
.sidebar {
    display: block !important;
    width: 200px;
    background-color: aquamarine;
}
.sidebar {
    display: none !important;
}
.page-container {
  display: flex;
  flex-direction: row;
  padding: 0px 45px;
}
.user-info {
  text-align: left;
  align-items: left;
}
.main-content {
  width: 90%;
  padding: 30px;
}
#markdown-content {
    text-align: left;
    /* align-items: flex-start; */
    justify-content: left;
}
.post-comment {
  display: flex;
  justify-content: left;
  margin-top: 40px;
}
.coments-textarea {
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-left: 30px;
}
.post-button {
  display: flex;
  justify-content: right;
  margin-top: 15px;
}
</style>