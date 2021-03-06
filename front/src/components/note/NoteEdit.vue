<template>
  <div class="editor-page">
    <br />
    <br />
    <div class="head">
      <div class="head-title">Post Your Own Article</div>
      <div class="head-img">
        <img :src="headImg" class="imgpic" />
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
      <div class="folder">
        <div class="frame-header">Folder</div>
        <div class="folder-selection">
          <el-select v-model="note.selectedFolder" placeholder="Please select">
            <el-option
              v-for="item in userFolder"
              :key="item.folder_id"
              :label="item.folder_title"
              :value="item.folder_id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="description">
        <div class="frame-header">Description</div>
        <div>
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
            @imgAdd="$imgAdd"
            style="min-height: 500px; max-width: 1100px; z-index: 99"
          >
          </mavon-editor>
        </div>
      </div>
    </el-card>
    <div class="button-box">
      <el-select v-model="note.visibility" class="permission-setting">
        <el-option key="public" value="public" label="public"></el-option>
        <el-option key="private" value="private" label="private"></el-option>
      </el-select>
      <el-button type="primary" @click="postContent"> Post </el-button>
    </div>
  </div>
</template>

<script>
import TypeWriter from "../../assets/Note/typewriter.png";
import { hostAddr } from "../../utils/const";
export default {
  name: "NoteEdit",
  data() {
    return {
      dialogFormVisible: false,
      noteList: [],
      titleList: [],
      userFolder: [],
      note: {
        title: "",
        description: "",
        contentMd: "",
        selectedFolder: "",
        visibility: "public",
      },
      // basic configuration of the markdown-editor plugin
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
        fullscreen: false, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        // save: true, // 保存（触发events中的save事件）
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
    };
  },
  created() {
    // get the folder information
    this.$axios
      .post("/note/local-folder-notes-get", { withNote: "false" })
      .then((res) => {
        this.userFolder = res.data.data;
        console.log(this.userFolder);
      });
    /* if the router contains id info, which indicate that it should be the edit mode
     * render the title, content, folder, description, visibility automatically */
    if (this.$route.params.id) {
      let noteId = this.$route.params.id;
      this.$axios.get("/note/note-get/" + noteId, {}).then((res) => {
        this.note.title = res.data.noteData.title;
        this.note.description = res.data.noteData.description;
        this.note.contentMd = res.data.noteData.contentMD;
      });
    }
    if (this.$route.params.folder) {
      this.note.selectedFolder = this.$route.params.folder;
    }
    if (this.$route.params.visibility) {
      this.note.visibility = this.$route.params.visibility;
    }
  },
  methods: {
    // the function of posting an article
    postContent() {
      console.log(this.note);
      if (this.note.title && this.note.contentMd && this.note.selectedFolder) {
        this.$axios
          .post("/note/modify-note", {
            mode: this.$route.params.id ? "edit" : "new", // dynamically determine the post mode: edit/new
            folderId: this.note.selectedFolder,
            noteId: this.$route.params.id ? this.$route.params.id : "",
            title: this.note.title,
            description: this.note.description,
            contentMD: this.note.contentMd,
            visibility: this.note.visibility,
          })
          .then((res) => {
            // resolve function
            alert("post successfully!");
            // automatically redirect to the note-view page
            this.$router
              .push({
                path: "/note/view",
                query: {
                  id: this.$route.params.id
                    ? this.$route.params.id
                    : res.data.data._id,
                },
              })
              .catch((err) => {
                err;
              });
          })
          .catch((err) => {
            alert("some error occur: ", err);
          });
      } else {
        this.$message({
          message:
            "ERR: You should at least input article title, content and target folder",
          type: "error",
        });
      }
    },
    /** this part is to handle the upload of the pics**/
    $imgAdd(pos, $file) {
      var formData = new FormData();
      formData.append("picture", $file);
      this.$axios.post("/note/upload-pic", formData).then((response) => {
        if (response.status === 200) {
          // parse the returned url
          let url = hostAddr + response.data.url;
          // replace the url in the content part to fit the markdown format
          this.$refs.md.$img2Url(pos, url);
        } else {
          alert("Upload failed");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.editor-page {
  min-width: 1300px;
  padding-bottom: 50px;
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
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
    font-weight: bold;
    color: #80688e;
    text-shadow: 0 0 10px #c6cacc, 0 0 20px #c6cacc, 0 0 50px #c6cacc,
      0 0 100px #c6cacc, 0 0 200px #c6cacc;
  }
  &-img {
    width: 20%;
    .imgpic {
      width: 100%;
    }
  }
}
/deep/.el-textarea__inner,
/deep/.el-input__inner {
  // background-color: transparent !important;
  border: 1px solid #f7f9fa;
  background-color: #f7f9fa;
}
.button-box {
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  justify-content: right;
}
.folder {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 16px;
  &-selection {
    margin-left: 30px;
    margin-top: 16px;
  }
}
.permission-setting {
  width: 100px;
  margin-right: 30px;
}
</style>
