<template>
  <div class="personal-center">
    <div class="operation-box">
      <el-tooltip effect="dark" content="Create">
        <el-button type="success" @click="dialogVisibleCreate = true" icon="el-icon-plus" circle> 
        </el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="Delete">
        <el-button type="danger" @click="showConfirmRemove" icon="el-icon-delete" circle></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="Rename">
        <el-button type="primary" @click="dialogVisibleRename = true" icon="el-icon-edit" circle></el-button>
      </el-tooltip>
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
              <el-button class="create-btn" @click="navigateToCreate">
                <i class="el-icon-plus"></i> Create New Note
              </el-button>
              <div class="article-cards-box">
                <div class="single-article" v-for="(item, i) in currentNotes" :key = "i">
                  <div>
                    <div @click="navigateToView(item.note_id)" class="single-article-title">
                      <i v-if="item.note_visibility === 'private'" class="el-icon-lock"></i>
                      {{item.note_title}}
                    </div>
                    <div class="single-article-description">{{item.note_description}}</div>
                  </div>
                  <div class="article-management-box">
                    <div class="article-management-box-btn">
                      <el-button 
                        type="text" 
                        @click="withParamsToView(item.note_id, item.note_visibility)"
                      >
                        <i class="el-icon-edit" style="color:#a98e6b;"></i>
                      </el-button>
                    </div>
                    <div class="article-management-box-btn">
                      <el-dropdown @command="(command) => {moveArticle(command, item.note_id)}">
                        <span class="el-dropdown-link">
                          <i class="el-icon-folder" style="color:#909399;"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item 
                            v-for="(item) in folders"
                            :key="item.folder_id"
                            :command="item.folder_id"
                          >{{item.folder_title}}</el-dropdown-item>
                          <el-dropdown-item divided disabled>Move to ...</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                    <div class="article-management-box-btn">
                      <el-popconfirm
                        confirm-button-text='Sure'
                        cancel-button-text='Cancel'
                        icon="el-icon-info"
                        icon-color="red"
                        title="Are you sure you want to delete this note?"
                        @confirm="deleteArticle(item.note_id)"
                      >
                        <el-button type="text" slot="reference">
                          <i class="el-icon-delete" style="color:#f56c6c;"></i>
                        </el-button>
                      </el-popconfirm>
                      
                    </div>
                  </div>
                </div>
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
      dialogVisibleDelNote: false,
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
        alert("delete successfully")
      })
      

      this.dialogVisibleDel = false
    },
    createFolder() {
      if (this.newFolderName) {
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
          alert("successfully rename the folder")
        })
        this.folders = newFolders
        this.newFolderName = ''
        this.dialogVisibleRename = false
      }
    },
    navigateToCreate() {
      this.$router.push({
        name: 'NoteEdit',
        params: {
          folder: this.currentFolder
        }
      }).catch(err => {err})
      // this.$router.push('/note/edit').catch(err => {err})
    },
    moveArticle(command, id) {
      console.log("folder id is", command)
      console.log("note id is", id)
      console.log("temp folder is", this.currentFolder)
      if (command == this.currentFolder) {
        alert("cannot move to the same folder")
      } else {
        let modifiedFolder = this.folders;
        let tempNote;
        modifiedFolder.forEach((folder, index) => {
          if (folder.folder_id === this.currentFolder) {
            folder.note.forEach((note) => {
              if (note.note_id===id) {
                tempNote = note
              }
            })
            folder.note = folder.note.filter(note => note.note_id !== id);
          }
        });
        modifiedFolder.forEach((folder, index) => {
          if (folder.folder_id === command) {
            folder.note.push(tempNote)
          }
        });
        this.folders = modifiedFolder;
        this.$axios.post("/note/move-note", {
          noteId: id,
          oldFolderId: this.currentFolder,
          newFolderId: command
        }).then((res) => {
          alert("move successfully")
        })
      }
    },
    deleteArticle(id) {
      console.log(id)
      let modifiedFolder = this.folders;
      modifiedFolder.forEach((folder, index) => {
        if (folder.folder_id === this.currentFolder) {
          folder.note = folder.note.filter(note => note.note_id !== id);
        }
      });
      this.$axios.post("/note/delete-note", {
        folderId: this.currentFolder,
        noteId: id
      }).then((res) => {
        console.log(res)
        alert("delete successfully! ")
      })
      this.folders = modifiedFolder
    },
    navigateToView(id) {
      this.$router.push({
        path:"/note/view",
        query:{
          id: id,
        }
      }).catch(err => {err})
    },
    withParamsToView(id, visibility) {
      this.$router.push({
        name: 'NoteEdit',
        params: {
          id: id,
          visibility: visibility,
          folder: this.currentFolder
        }
      }).catch(err => {err})
    }
  }
}
</script>

<style lang="less" scoped>
.operation-box {
  display: flex;
  flex-direction: row;
  justify-content: left;
}
.article-container{
  /* padding: 30px; */
  margin-top: 30px;
  display: flex;
  flex-direction: row;
    
}
/* .folder{ */
    /* width: 200px; */
/* } */
.articles {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* align-items: left; */
    justify-content: left;
    overflow: wrap;
    padding-left: 30px;
}
.article-cards-box {
  margin-top: 30px;
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
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
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