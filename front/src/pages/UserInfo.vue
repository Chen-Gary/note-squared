<template>
  <div class="top_space">
    <el-row>
      <el-col :span="1" style="margin-left: 20px">
        <div class="grid-content bg-purple">
          <el-avatar
            shape="square"
            :size="40"
            :src="squareUrl"
            @click.native="open_avatar_window"
            id="avatar-image"
          ></el-avatar>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple-light" style="margin-left: 0px">
          <p style="font-weight: bold">
            {{ username }}
            <el-button
              class="note-operation"
              type="text"
              @click="open_nickname_window"
              style="margin-left: 10px"
              ><i class="el-icon-edit"></i
            ></el-button>
          </p>
        </div>
      </el-col>

      <el-col :span="18">
        <div class="grid-content bg-purple">
          <br />
        </div>
      </el-col>
      <el-col :span="19">
        <div class="grid-content bg-purple-light" style="margin-left: 0px">
          <el-button
            class="note-operation"
            type="info"
            plain
            @click="log_out"
            style="margin-right: -90%"
            >Log out</el-button
          >
        </div>
      </el-col>
    </el-row>

    <div>
      <el-dialog
        title="Change Nickname"
        :visible.sync="nickname_dialogVisible"
        width="30%"
        @close="nickname_dialogVisible = false"
      >
        <span
          ><el-form label-width="120px" width:200px>
            <br />
            <el-form-item label="New Nickname">
              <el-input v-model="new_username"></el-input>
            </el-form-item> </el-form
        ></span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="nickname_dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleConfirmNickname"
            >Save</el-button
          >
        </span>
      </el-dialog>
    </div>

    <div>
      <el-dialog
        title="Change Avatar"
        :visible.sync="avatar_dialogVisible"
        width="30%"
        @close="avatar_dialogVisible = false"
      >
        <el-form label-width="120px" width:200px>
          <el-upload
            class="avatar-uploader"
            name="avatar"
            action="useless"
            :headers="obj"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarFail"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="avatar_dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleConfirmAvatar"
            >Save</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { hostAddr } from "../utils/const";
export default {
  name: "UserInfo",
  created() {
    this.upate_avatar();
    this.update_nickname();
  },
  data() {
    return {
      imageUrl: "",
      file_info: "",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png", //头像图片链接
      username: "12345678910", //当前用户名
      new_username: "", //新的用户名
      nickname_dialogVisible: false, //修改用户名弹窗是否显示
      avatar_dialogVisible: false, //修改头像弹窗是否显示
    };
  },
  methods: {
    //头像成功上传到vue
    handleAvatarSuccess(res, file) {
      console.log("file success");
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.file_info = file.raw;
    },
    //头像上传到vue失败
    handleAvatarFail(res, file, fileList) {
      console.log("file fail");
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.file_info = file.raw;
    },
    //在图片上传时检查图片一些属性
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("The uploaded profile picture can only be JPEG!");
      }
      if (!isLt2M) {
        this.$message.error(
          "The size of the uploaded profile picture cannot exceed 2MB!"
        );
      }
      return isJPG && isLt2M;
    },
    //打开修改用户名弹窗
    open_nickname_window() {
      this.nickname_dialogVisible = true;
    },
    //打开修改头像弹窗
    open_avatar_window() {
      this.imageUrl = "";
      this.avatar_dialogVisible = true;
    },
    //确认修改用户名
    handleConfirmNickname() {
      this.upload_newNickname();
      this.nickname_dialogVisible = false;
    },
    //上传头像
    uploadAvatar() {
      var formdata = new FormData();
      formdata.append("avatar", this.file_info);
      this.$axios.post("/user/set-avatar", formdata).then((response) => {
        console.log("response");
        console.log(response);
        if (response.status === 200) {
          this.$message({
            message: "Successfully change the avater!",
            type: "success",
          });
        } else {
          this.$message.error({
            message: "Fail to change the avater!",
          });
        }
      });
    },
    //更新头像
    upate_avatar() {
      console.log("id");
      console.log(localStorage.id);

      this.$axios
        .get("/user/get-avatar?uid=" + localStorage.id)
        .then((response) => {
          console.log(response);
          //存在头像
          if (response.data.avatarExist) {
            this.imageUrl = hostAddr + response.data.url;
            this.squareUrl = this.imageUrl;
          }
          // this.username = response.data.name;
        })
        .catch(function (error) {
          alert("some error occur, can not receive");
          console.log(error);
        });
    },
    //上传新的用户名
    upload_newNickname() {
      this.$axios
        .post("/user/set-name", {
          newName: this.new_username,
        })
        .then((response) => {
          console.log("response");
          console.log(response);
          if (response.status === 200) {
            this.$message({
              message: "Successfully change the nickname!",
              type: "success",
            });
            this.update_nickname();
          } else {
            this.$message.error({
              message: "Fail to change the nickname!",
            });
          }
        });
    },
    //更新用户名
    update_nickname() {
      this.$axios
        .get("/user/profile")
        .then((response) => {
          console.log(response);
          this.username = response.data.name;
        })
        .catch(function (error) {
          alert("some error occur, can not receive");
          console.log(error);
        });
    },
    handleConfirmAvatar() {
      //上传到后端
      this.uploadAvatar();

      //UI更新
      this.squareUrl = this.imageUrl;
      this.avatar_dialogVisible = false;
    },

    onchange(file, fileList) {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        _this.imageUrl = e.target.result; //将图片路径赋值给src
      };
      reader.readAsDataURL(file);
      console.log(reader);
    },
    //退出登录
    log_out() {
      localStorage.clear();
      this.$router.replace("/home");
    },
    //跳转到笔记社区
    to_note_community() {
      this.$router.replace("/community");
    },
  },
};
</script>

<style scoped>
.top_space {
  margin-top: 4%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.image {
  left: 0ch;
}
</style>
