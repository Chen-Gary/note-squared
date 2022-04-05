// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from "./store";
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import elTableInfiniteScroll from 'el-table-infinite-scroll';

import axios from 'axios'
import VueAxios from 'vue-axios'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


axios.defaults.baseURL = 'http://120.78.207.251:3000/api/user'
//axios.defaults.withCredentials = true


Vue.config.productionTip = false
Vue.use(elTableInfiniteScroll)
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.prototype.$axios = axios
/*Vue.use(VueAxios,axios)*/

const http = axios.create({
  baseURL:'http://120.78.207.251:3000/api/user'
})




//路由守卫
router.beforeEach((to,from,next) =>{
  if(to.meta.requireAuth){
    if(store.state.currentUser !== null && store.state.currentUser){
      next()
    }
    else{
      next({
        path:'/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else{
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
