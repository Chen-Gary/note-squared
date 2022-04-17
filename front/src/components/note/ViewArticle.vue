<template>
  <div class="page-container">  
      <div class="main-content">
        <div class="article-title">
          {{this.note_title}}  
        </div>      
        <el-row>
        <el-col :span="1" style="margin-left:0px">
            <div class="grid-content bg-purple">
              <el-avatar shape="circle" :size="40" :src="squareUrl" @click.native="open_avatar_window" id="avatar-image" ></el-avatar>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple-light" style="margin-left:0px">
              <p style="font-weight:bold">{{this.note_author}} </p>
             
            </div>
          </el-col>
           <el-col :span="2">
            <div class="grid-content bg-purple-light" style="margin-left:0px">
              <p>{{this.note_publishDate}} </p>
             
            </div>
          </el-col>
        </el-row>

        <div class="markdown-body" id="markdown-content">
          <VueMarkdown :source="note_content" v-highlight></VueMarkdown>
        </div>
        <div v-if="note_isMe == false" class="interface-box">
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
            ></el-image>
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
    this.get_note_info();
    this.get_note_recommendation();
  },
  data () {
    return {
      liked_status :"Like\xa0\xa0\xa0\xa0\xa0\xa0Fork",
      note_id:this.$route.query.id,
      note_author:"",
      note_author_id:"",
      note_publishDate:"",
      note_title:"",
      note_description:"",
      note_content:"",
      note_like:0,
      note_isLiked:false,
      note_isMe:false,
      squareUrl:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",//头像
      button_color_index:"button_bgcolor",//0默认，1有数值
      recommendation_list:[],
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', 
      comment: "",
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
              this.note_author_id = response.data.noteData.author;
              this.note_description = response.data.noteData.description;
              this.note_publishDate = response.data.noteData.publishDate.slice(0,10);
              this.note_like = response.data.noteData.like;
              this.note_title = response.data.noteData.title;
              this.note_isMe = response.data.noteData.isMe;
              this.note_isLiked = response.data.isLiked;
              this.note_id = response.data.noteData._id;//id应该原来就有，可以删除
              this.note_content = response.data.noteData.contentMD;
              console.log(this.note_isLiked)
              console.log(this.note_author_id)
              if (this.note_isLiked) 
              {
                this.button_color_index = "button_bgcolor2"//已经喜欢过了
                this.liked_status = "Liked\xa0\xa0\xa0\xa0\xa0\xa0Fork"
              }
              else {
                this.button_color_index = "button_bgcolor"
                this.liked_status = "Like\xa0\xa0\xa0\xa0\xa0\xa0Fork"
              }
              this.get_avatar()
          }
          else{
            this.$message.error({
              message: 'Fail to get note info!',
            });
          }
        })
      },
      get_avatar(){
        console.log("author_id")
        console.log(this.note_author_id);
        this.$axios.get("/user/get-avatar?uid="+ this.note_author_id).then(response=>{
            console.log(response)
            //存在头像
            if (response.data.avatarExist)
            {
              this.squareUrl = 'http://localhost:3000'+response.data.url
            }
          })
          .catch(function (error) {
            alert("some error occur, can not receive")
            console.log(error)
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

<style scoped>
.article-title {
  font-size: 32px;
  font-weight: 700;
}
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
/* .sidebar {
    display: none !important;
} */
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