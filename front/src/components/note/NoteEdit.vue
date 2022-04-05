<template>
  <div>
    <div class="head">
      <div class="head-title">Post Your Own Article</div>
      <div class="head-img">
        <img :src="headImg" class="imgpic">
      </div>
    </div>
    <el-card class="note" v-model="note" :body-style="{ padding: '90px' }">
      <div class="title">
        <div class="frame-header" style="margin-top: 0px">Title</div>
        <div>
          <el-input 
            v-model="note.title" 
            placeholder="Please enter the title"
          ></el-input>
        </div>
      </div>
      <div class="description">
        <div class="frame-header">Description</div>
        <div >
          <el-input 
            v-model="note.description"
            placeholder="Please enter the description"
            maxlength="100"
            show-word-limit
            type="textarea" 
          ></el-input>
        </div>
      </div>
      <div class="content">
        <div class="frame-header">Content</div>
        <div class="editor">
          <mavon-editor
            ref="md"
            language="en"
            :toolbars="this.toolbars"
            v-model="note.contentMd"
            @save="saveNote"
            @imgAdd="imgAdd"
            style="min-height: 500px;max-height: 500px"
            >
          </mavon-editor>
        </div>
      </div>
    </el-card>
    <div class="button-box">
      <el-button type="primary" @click="postContent">
        Post
      </el-button>
    </div>
  </div>
</template>

<script>
  import TypeWriter from '../../assets/Note/typewriter.png'
  export default {
    name: "NoteEdit",
    data() {
      return {
        dialogFormVisible: false,
        noteList: [],
        titleList: [],
        note:{
          title: '',
          description: '',
          contentMd: ''
        },
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: false, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        },
        headImg: TypeWriter,
      }
    },
    mounted() {
      if(this.$route.query.noteId){
        this.loadNote(this.$route.query.noteId)
      }
    },
    methods: {
      postContent(){
        console.log(this.note)
        alert("ok!")
      },
      download(){
        if ("download" in aElement) {
          const aElement = document.createElement("a");
            aElement.download = filename;
            aElement.style.display = "none";
            aElement.href = URL.createObjectURL(new Blob([content]));

            document.body.appendChild(aElement);
            aElement.click();
            aElement.remove();
        } else {
            // vditor.tip.show(window.VditorI18n.downloadTip, 0);
        }
      },
      exportMarkdown(){
        download(this.note.contentMd, this.note.title + ".md");
      },
      loadNote(id){
        var _this = this
        this.axios.get('note/'+id.toString())
        .then(function (response) {
          if(response.data.status === 200){
            _this.note = response.data.object
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      saveNote(value,render){
        var _this = this
        var url = '/update/content/note/'+this.note.id
        this.note.contentMd = value
        this.note.contentHtml = render
        this.axios.post(url,this.note)
        .then(function (response) {
          if(response.data.status === 200){
            _this.$message({
              type:'success',
              message:'保存成功'
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      /** this part is to handle the upload of the pics**/
      imgAdd(pos, $file){
        var _this = this
        var formData = new FormData();
        formData.append('image', $file);
        this.axios({
          url: 'pic/',
          method: 'post',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then((response) => {
          if(response.status === 200){
            let url = response.data.object;
            _this.$refs.md.$img2Url(pos, url);
          }
          console.log(url)

        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-scrollbar__wrap{
    overflow-x: hidden!important;
  }
  .note {
    font-family: sans-serif;
    width: 90%;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    border-radius: 20px;
  }
  .frame-header {
    text-align: left;
    margin: 16px 0 8px 0;
    font-size: 22px;
  }
  .head {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    &-title {
      font-size: 38px;
      font-weight:bold;
      color: #80688E;
      text-shadow: 
        0 0 10px #C6CACC,
        0 0 20px #C6CACC,
        0 0 50px #C6CACC,
        0 0 100px #C6CACC,
        0 0 200px #C6CACC
    }
    &-img{
      width: 20%;
      .imgpic {
        width: 100%;
      }
    }
  }
  /deep/.el-textarea__inner, /deep/.el-input__inner {
  // background-color: transparent !important;
  border: 1px solid #F7F9FA;
  background-color: #F7F9FA;
  }
  .button-box {
    width: 90%;
    margin: 0 auto;
    margin-top: 30px;
    display: flex;
    justify-content: right;
  }
</style>


