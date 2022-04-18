<template>
  <div class="page-container">  
    <div class="main-content">
      <div class="article-title">
        {{this.note_title}}
        <i 
          style="font-size: 25px; cursor: pointer;"
          @click="navigateToEdit(note_id)" 
          class="el-icon-edit" 
          v-if="note_isMe == true"
        ></i>
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
          <div class="grid-content bg-purple-light" style="margin-left:0px; font-size: 14px; color: #909399">
            <p>{{this.note_publishDate}} </p>
          </div>
        </el-col>
      </el-row>

      <div class="markdown-body" id="markdown-content">
        <!-- <VueMarkdown :source="note_content" v-highlight></VueMarkdown> -->
        <mavon-editor
          :value="note_content"
          :subfield="prop.subfield"
          :defaultOpen="prop.defaultOpen"
          :toolbarsFlag="prop.toolbarsFlag"
          :editable="prop.editable"
          :scrollStyle="prop.scrollStyle"
        ></mavon-editor>
      </div>
      <div v-if="note_isMe == false" class="interface-box">
        <!-- 添加v-if 如果是自己的文章则没有 -->
        <el-button type="primary" :class = "button_color_index" @click="like_notes" icon ="el-icon-caret-top" circle style="font-size: 15px;"></el-button>
        <el-button type="warning" icon="el-icon-star-off" @click="displayForkDialog" circle></el-button>
        <p>{{liked_status}}</p>
      </div>
      <el-divider>END</el-divider>
      <!-- <div class="comments-area">
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
      </div> -->
    </div>
    <div class="sidebar">
      <div class="sidebar-container">
        <div class="advertisements">
          <el-carousel trigger="click" height="150px">
            <el-carousel-item>
              <img :src="carousel1" class="carousel-pic">
            </el-carousel-item>
            <el-carousel-item>
              <img :src="carousel2" class="carousel-pic">
            </el-carousel-item>
            <el-carousel-item>
              <img :src="carousel3" class="carousel-pic">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="recommendations">
          <div class="recommendations-header">
            <div class="recommendations-header-title"> Recommendations </div>
            <div class="recommendations-header-more" @click="navigateToCom"> 
              (<u>more</u>) 
            </div>
          </div>
          <div v-for="(item) in recommendation_list" :key="item.id">
            <div class="recommend-article-title" @click="navigateToView(item.note_id)">{{item.title}}</div>
            <div class="divider-dashed"></div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="Fork"
      :visible.sync="dialogVisibleFork"
      width="40%">
      <el-select style="width: 250px" v-model="selectedFolder" placeholder="Please select the target folder">
        <el-option
          v-for="item in userFolder"
          :key="item.folder_id"
          :label="item.folder_title"
          :value="item.folder_id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleFork = false">取 消</el-button>
        <el-button type="primary" @click="note_fork">确 定</el-button>
      </span>
    </el-dialog>
  </div>  
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { Message } from 'element-ui'
import TypeWriter from '../../assets/Note/typewriter.png'
import Program from '../../assets/Note/program.png'
import HomePic4 from '../../assets/Home/home_pic4.png'
import { hostAddr } from '../../utils/const'
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
  watch: {'$route' (to, from) {
      this.$router.go(0);
    }
  },
  computed: {
    prop() {
      let data= {
        subfield: false,
        defaultOpen: 'preview',
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      }
      return data
    }
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
      dialogVisibleFork: false,
      selectedFolder: "",
      userFolder: [],
      carousel1: TypeWriter,
      carousel2: Program,
      carousel3: HomePic4
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
              this.note_isMe = response.data.isMe;
              console.log("update note_isMe", this.note_isMe)
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
              this.squareUrl = hostAddr + response.data.url
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
    displayForkDialog() {
      this.$axios.post("/note/local-folder-notes-get", { withNote: "false" })
      .then (res => {
        this.userFolder = res.data.data;
        console.log("finish getting", this.userFolder)
      })
      this.dialogVisibleFork = true;
    },
    note_fork()
    {
      this.$axios.post("/note/fork-note",{
        folderId: this.selectedFolder,
        noteId: this.note_id,
        })
        .then(response=>{
          console.log(response)
          if (response.status === 200)
          {
            // todo: 后端返回isForked
            // this.note_isLiked = !this.note_isLiked;
            Message.success("Successfully forked to your folder!")
          }
          else{
            this.$message.error({
            message: 'Fail to get note info!',
            });
          }
        })
        this.dialogVisibleFork = false;
    },
    navigateToCom() {
      this.$router.push('/community').catch(err => {err});
    },
    navigateToView(id) {
      this.$router.push({
        path:"/note/view",
        query:{
          id: id,
        }
      }).catch(err => {err})
    },
    navigateToEdit(id) {
      this.$router.push({
        name: 'NoteEdit',
        params: {
          id: id
        }
      }).catch(err => {err})
      console.log("id in view page is ", id)
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
            console.log("recommendation list are ", this.recommendation_list)
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

<style lang="less" scoped>
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
.page-container {
  display: flex;
  flex-direction: row;
  padding: 0px 45px;
  margin-top: 50px;
}
.user-info {
  text-align: left;
  align-items: left;
}
.main-content {
  width: 85%;
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
.sidebar {
    display: block !important;
    width: 320px;
    &-container {
      position: fixed;
      right: 60px;
      bottom: 100px;
    }
    // background-color: aquamarine;
}
/* .sidebar {
    display: none !important;
} */
.divider-dashed {
  border-top:1px dashed #afb3ac;
  margin-bottom: 8px;
}
.recommend-article-title {
  cursor: pointer;
  overflow: wrap;
}
.recommendations {
  text-align: left;
  color: #626568;
  padding: 15px;
  &-header{
    display: flex;
    justify-content: space-between;
    // align-items: center;
    &-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    &-more {
      font-size: 16px;
      color:#66a0cc;
      cursor: pointer;
    }
  }
}
.advertisements {
  margin-bottom: 30px;
  .carousel-pic {
    width: 100%;
  }
}
</style>