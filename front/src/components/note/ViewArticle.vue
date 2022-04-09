<template>
    <div class="markdown-body" id="markdown-content">
        <VueMarkdown :source="value" v-highlight></VueMarkdown>
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

<style scoped>
#markdown-content {
    text-align: left;
    /* align-items: flex-start; */
    justify-content: left;
}
</style>