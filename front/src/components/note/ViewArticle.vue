<template>
  <div class="page-container">  
      <div class="main-content">
        <div class="user-info">Some User Info Here</div>
        <div class="markdown-body" id="markdown-content">
          <VueMarkdown :source="value" v-highlight></VueMarkdown>
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
      value: "# test\n```java\npublic class Test {\n\tpublic static void testFunc() {\n\t\tSystem.out.println(\"hi\");\n\t}\n}\n```\ntest content" // value的值是要解析的markdown数据
    }
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 1000px) {
  .sidebar {
    display: block !important;
    width: 150px;
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
}
.main-content {
  width: 100%;
}
#markdown-content {
    text-align: left;
    /* align-items: flex-start; */
    justify-content: left;
}
</style>