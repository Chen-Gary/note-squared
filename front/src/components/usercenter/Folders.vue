<template>
  <div class="personal-center">
    <div class="operation-box">
      <el-button @click="dialogVisibleCreate = true">Create</el-button>
      <el-button @click="showConfirmRemove">Delete</el-button>
      <el-button @click="dialogVisibleRename = true">Rename</el-button>
    </div>
    <div class="article-container">
      <div class="folder">
        <el-tabs v-model="currentFolder" tab-position="left">
          <el-tab-pane
            :key="item.folder_id"
            v-for="(item) in folders"
            :label="item.folder_title"
            :name="item.folder_id"
          >
            <div class="articles">
              <el-button class="create-btn" @click="navigateToCreate">Create New Note</el-button>
              <div>
                <div class="single-article" v-for="(item, i) in currentNotes" :key = "i">
                  <div class="single-article-title">{{item.note_title}}</div>
                  <div class="single-article-description">{{item.note_description}}</div>
                </div>
                <!-- <div>{{currentNotes}}</div> -->
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleDel"
      width="40%">
      <span>是否确认删除?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDel = false">取 消</el-button>
        <el-button type="primary" @click="removeFolder">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleCreate"
      width="40%">
      <el-input v-model="newFolderName" placeholder="Please enter the folder name."></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleCreate = false">取 消</el-button>
        <el-button type="primary" @click="createFolder">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleRename"
      width="40%">
      <el-input v-model="newFolderName"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleRename = false">取 消</el-button>
        <el-button type="primary" @click="renameFolder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Folders",
  created() {
    this.$axios.post("/note/local-folder-notes-get", {withNote: "true"})
    .then( res => {
      console.log("created res is ", res.data.data)
      if(res.status == "200") {
        this.folders = res.data.data;
        this.currentFolder = this.folders[0].folder_id
      }
    })
  },
  data() {
    return {
      currentFolder: '',
      folders: [],
      dialogVisibleDel: false,
      dialogVisibleCreate: false,
      dialogVisibleRename: false,
      newFolderName: '',
    };
  },
  computed: {
    currentNotes() {
      let curNotes = []
      this.folders.forEach((folder) => {
        if (folder.folder_id === this.currentFolder) {
          curNotes = folder.note
          console.log("current id is ", folder.folder_id)
          console.log(folder.note)
        }
      })
      console.log('cur note is ', curNotes)
      return curNotes
    }
  },
  methods: {
    showConfirmRemove() {
      if (this.folders.length != 0) {
        this.dialogVisibleDel = true
      }
      else {
        alert("No folder to be deleted!")
      }
    },
    removeFolder() {
      let tabs = this.folders;
      let activeName = this.currentFolder;
      tabs.forEach((tab, index) => {
        if (tab.folder_id === this.currentFolder) {
          let nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.folder_id;
          }
        }
      });
      console.log("current folder is ", this.currentFolder)
      this.folders = tabs.filter(tab => tab.folder_id !== this.currentFolder);
      this.currentFolder = activeName;
      console.log(this.folders)
      this.$axios.post("/note/delete-folder", {
        folderId: activeName
      }).then(res => {
        console.log("delete res is ", res)
      })
      

      this.dialogVisibleDel = false
    },
    createFolder() {
      // 缺一个非空检查
      if (this.newFolderName) {
        // post request
        console.log("post")
        this.$axios.post("/note/modify-folder",{
          title: this.newFolderName,
          mode: "new"
        }).then(res => {
          console.log("response is ,", res)
          let newFolderItem = {
            folder_id: res.data.data._id,
            folder_title: res.data.data.title,
            note: res.data.data.notes
          }
          this.folders.push(newFolderItem)
        })
        this.newFolderName = ''
        this.dialogVisibleCreate = false
      } else {
        alert ("the folder name cannot be empty")
      }
    },
    renameFolder() {
      if (this.newFolderName) {
        let newFolders = []
        let newFolderItem
        for (let i=0; i<this.folders.length; i++) {
          if (this.folders[i].folder_id === this.currentFolder) {
            newFolderItem = {
              folder_title: this.newFolderName,
              folder_id: this.folders[i].folder_id,
              note: this.folders[i].notes
            }
            newFolders.push(newFolderItem)
          } else {
            newFolders.push(this.folders[i])
          }
        }
        this.$axios.post("/note/modify-folder", {
          mode: "edit",
          title: newFolderItem.folder_title,
          folderId: newFolderItem.folder_id
        }).then(res => {
          console.log("res from rename is ", res)
        })
        this.folders = newFolders
        this.newFolderName = ''
        this.dialogVisibleRename = false
      }
    },
    navigateToCreate() {
      this.$router.push('/note/edit')
    }
  }
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
/* .folder{ */
    /* width: 200px; */
/* } */
.articles {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* align-items: left; */
    justify-content: left;
    overflow: wrap;
}
.single-article {
  border: 2px solid black;
  border-radius: 20px;
  padding: 12px 20px;
  text-align: left;
  width: 225px;
  height: 175px;
}
.single-article-title {
  font-size: 18px;
  font-weight: 700;
}
.single-article-description {
  font-size: 15px;
}
.create-btn {
  width: 170px;
  font-size: 16px;
}
</style>