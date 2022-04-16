<template>
  <div class="page-container">  
      <div class="main-content">
        <div class="user-info">Some User Info Here</div>
        <div class="markdown-body" id="markdown-content">
          <VueMarkdown :source="value" v-highlight></VueMarkdown>
        </div>
        <div class="interface-box">
          <!-- 添加v-if 如果是自己的文章则没有 -->
          <el-button type="primary" circle></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
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
  data () {
    return {
      fit: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', 
      comment: "",
      value: "# test\n```java\npublic class Test {\n\tpublic static void testFunc() {\n\t\tSystem.out.println(\"hi\");\n\t}\n}\n```\ntest content" // value的值是要解析的markdown数据
    }
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 1000px) {
  .sidebar {
    display: block !important;
    width: 200px;
    background-color: aquamarine;
  }
}
@media only screen and (max-width: 999px) {
  .sidebar {
    display: none !important;
  }
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
// .comment-input{
//   margin-left: 30px;
// }
</style>