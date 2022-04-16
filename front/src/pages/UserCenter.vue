<template>
  <div class="personal-center">
    <div class="user-info">
      <UserInfo/>
    </div>
    <el-tabs type="card" v-model="activeName">
      <el-tab-pane label="My Articles" name="first">
        <Folders />
      </el-tab-pane>
      <el-tab-pane label="Saved" name="second">Saved</el-tab-pane>
      <el-tab-pane label="Liked" name="third">Liked</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Folders from "../components/usercenter/Folders.vue"
import UserInfo from "./UserInfo.vue"
export default {
  name: "UserCenter",
  components:{
    Folders,
    UserInfo,
  },
  data() {
    return {
      activeName: "first"
    };
  },

}
</script>

<style scoped>
.personal-center {
  padding: 30px 50px;
}
.operation-box {
  display: flex;
  flex-direction: row;
  justify-content: left;
}
.article-container{
  padding: 30px;
  display: flex;
  flex-direction: row;
    
}
.articles {
    width: 100%;
}
</style>