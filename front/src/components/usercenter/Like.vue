<template>
  <div class="article-cards-box">
    <!-- similar to that written in folders.vue -->
    <div class="single-article" v-for="(item, i) in LikedList" :key="i">
      <div>
        <div @click="navigateToView(item.id)" class="single-article-title">
          <i v-if="item.note_visibility === 'private'" class="el-icon-lock"></i>
          {{ item.title }}
        </div>
        <div class="single-article-description">{{ item.description }}</div>
      </div>
      <div class="article-management-box">
        <div class="article-management-box-btn">
          <el-popconfirm
            confirm-button-text="Sure"
            cancel-button-text="Cancel"
            icon="el-icon-info"
            icon-color="red"
            title="Are you sure you want to cancel your like to this note?"
            @confirm="cancelLike(item.id)"
          >
            <el-button type="text" slot="reference">
              <i class="el-icon-delete" style="color: #f56c6c"></i>
            </el-button>
          </el-popconfirm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      LikedList: [],
    };
  },
  // when created, get the liked-note
  created() {
    this.$axios.get("/note/likeNote-get").then((res) => {
      this.LikedList = res.data.list;
    });
  },
  methods: {
    // navigate to the note view
    navigateToView(id) {
      this.$router
        .push({
          path: "/note/view",
          query: {
            id: id,
          },
        })
        .catch((err) => {
          err;
        });
    },
    // cancel the like of note
    cancelLike(id) {
      let modifiedLikeList = this.LikedList;
      this.LikedList = modifiedLikeList.filter((item) => item.id !== id);
      this.$axios
        .post("/note/like-note", {
          mode: "dislike",
          noteId: id,
        })
        .then((res) => {
          console.log("res from cancel", res);
        });
    },
  },
};
</script>

<style scoped>
.article-cards-box {
  margin-top: 30px;
  padding-left: 50px;
  display: flex;
  flex-flow: row wrap;
  /* overflow: wrap; */
}
.single-article {
  border: 2px solid #aac7f0;
  border-radius: 20px;
  padding: 12px 20px;
  margin-right: 40px;
  margin-bottom: 30px;
  text-align: left;
  width: 225px;
  height: 175px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.single-article-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.single-article-description {
  font-size: 15px;
}
.create-btn {
  width: 170px;
  font-size: 14px;
}
.article-management-box {
  display: flex;
  flex-direction: row;
  justify-content: right;
}
.article-management-box-btn {
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
