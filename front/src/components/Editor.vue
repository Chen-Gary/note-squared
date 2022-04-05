<template>
  <div>
    <div id="vditor" name="description"></div>
    <div>
      <button @click="testClick">test</button>
    </div>
  </div>
</template>

<script>
import Vditor from "vditor";
import 'vditor/dist/index.css';

export default {
  data(){
      return{
          contentEditor:"",
      }
  },
  mounted(){
    const options = {
        width: '80%',
        height: 500,
        tab: '\t',
        counter: '999999',
        // typewriterMode: true,
        lang: 'en_US',
        mode: 'wysiwyg',
        icon: 'material',
        preview: {
          delay: 100,
          show: !this.isMobile
        },
        outline: {
          enable: true,
          position: 'left'
        },
        upload: {
          max: 5 * 1024 * 1024,
          // linkToImgUrl: 'https://sm.ms/api/upload',
          // handler(file) {
          //   let formData = new FormData()
          //   for (let i in file) {
          //     formData.append('smfile', file[i])
          //   }
          //   let request = new XMLHttpRequest()
          //   request.open('POST', 'https://sm.ms/api/upload')
          //   request.onload = that.onloadCallback
          //   request.send(formData)
          // }
        }
      }
    this.contentEditor = new Vditor("vditor", options
    // {
    //   height: 500,
    //   width: '80%',
    //   toolbarConfig: {
    //     pin: true,
    //   },
    //   cache: {
    //     enable: false,
    //   },
    //   after: () => {
    //     this.contentEditor.setValue('To be developed!')
    //   },
    // }
    )
  },
  methods: {
    testClick() {
      console.log(this.contentEditor)
    }
  } 
}
</script>

<style scoped>
#viditor{
  align-content: left;
  align-items: left;
  text-align: left;
}
</style>
