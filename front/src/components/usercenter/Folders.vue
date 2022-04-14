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
            :key="item.name"
            v-for="(item) in folders"
            :label="item.title"
            :name="item.name"
          >
            <div class="articles">
              <div>
                <el-button @click="navigateToCreate">Create New Note</el-button>
              </div>
              <div>Put some notes here</div>
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
    this.$axios.get('/note/local-folder-notes-get').then( res => {
      console.log("created res is ", res)
    })
  },
  data() {
    return {
      currentFolder: '1',
      folders: [{
        title: 'Folder 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Folder 2',
        name: '2',
        content: 'Tab 2 content'
      }, {
        title: 'Folder 3',
        name: '3',
        content: 'Tab 3 content'
      }],
      dialogVisibleDel: false,
      dialogVisibleCreate: false,
      dialogVisibleRename: false,
      newFolderName: '',
    };
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
        if (tab.name === this.currentFolder) {
          let nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
        }
      });
      console.log("current folder is ", this.currentFolder)
      this.folders = tabs.filter(tab => tab.name !== this.currentFolder);
      this.currentFolder = activeName;
      console.log(this.folders)

      // 这里需要一个post函数
      

      this.dialogVisibleDel = false
    },
    createFolder() {
      // 缺一个非空检查
      let newTabName = this.folders.length + 1 + '';
      this.folders.push({
        title: this.newFolderName,
        name: newTabName,
        content: 'New Tab content'
      });
      this.currentFolder = newTabName
      // post request
      console.log("post")
      this.$axios.post("/note/modify-folder",{
        title: this.newFolderName,
        mode: "new"
      }).then(res => {
        console.log("response is ,", res)
      })

      this.newFolderName = ''
      this.dialogVisibleCreate = false
    },
    renameFolder() {
      let newFolders = []
      // 缺一个非空检查
      for (let i=0; i<this.folders.length; i++) {
        if (this.folders[i].name === this.currentFolder) {
          let newFolderItem = {
            title: this.newFolderName,
            name: this.folders[i].name,
            content: this.folders[i].content
          }
          newFolders.push(newFolderItem)
        } else {
          newFolders.push(this.folders[i])
        }
      }
      console.log(newFolders)
      this.folders = newFolders
      this.newFolderName = ''
      this.dialogVisibleRename = false
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
.folder{
    /* width: 200px; */
}
.articles {
    width: 100%;
}
</style>