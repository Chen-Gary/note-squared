<template>
  <div class="item">
    <!--分割线-->
    <el-divider></el-divider>

    <!--笔记标题-->
    <div class="title">
      <el-button type="text" class="title_text" @click="handle_router_change">{{
        noteItem.title
      }}</el-button>
    </div>

    <!--笔记简介-->
    <div class="description">
      <p>{{ noteItem.description }}</p>
    </div>

    <!--笔记点赞数和用户名-->
    <div type="flex" justify="end" class="right_cornor">
      <span>
        <img style="margin-bottom: -0.5%" :src="heart_url" class="heart" />
      </span>
      <span> {{ noteItem.thumb }}</span>
      <span class="span_format"> </span>
      <span> {{ noteItem.username }} </span>
    </div>
  </div>
</template>

<script>
//存放某页笔记的每一行的component
export default {
  name: "CommunityItem",
  props: {
    noteItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      heart_url: require("../../assets/heart.png"),
    };
  },
  methods: {
    handle_router_change() {
      this.$router
        .push({
          path: "/note/view",
          query: {
            id: this.noteItem.url,
          },
        })
        .catch((err) => {
          err;
        });
    },
  },
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
.title {
  margin-left: 2%;
  text-align: start;
  font-size: 20px;
  font-weight: bold;
}
.title_text {
  text-align: start;
  font-size: 20px;
  font-weight: bold;
  color: black;
}
.description {
  margin-left: 2%;
  text-align: start;
  font-size: 15px;
}
.heart {
  width: 3%;
  text-align: end;
}
.right_cornor {
  text-align: end;
  justify-content: "end";
  margin-right: 2%;
}
.span_format {
  text-align: center;
  padding-top: 2px;
  padding-bottom: 2px;
  background-color: rgba(255, 102, 0, 0);
  border-radius: 4px;
  margin-right: 2%;
}
</style>
