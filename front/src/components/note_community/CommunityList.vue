<template>
  <div class="note_info">
    <CommunityItem v-for="item in items" :key="item" :noteItem="item" />

    <!--最后一段分割线-->
    <div class="item">
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
//存放某页笔记的列表component
import CommunityItem from "./CommunityItem";
export default {
  name: "CommunityList",
  components: {
    CommunityItem,
  },
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      itemList: [], //所有笔记的数据
      page: {
        currentPage: 1, //当前页
        pagesize: 10, // 每页的数据
        rows: 1, //总条数
        totalPage: 5, //总页数
      },
    };
  },
  created() {},

  methods: {},
};
</script>

<style scoped>
.item {
  width: 80%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>
