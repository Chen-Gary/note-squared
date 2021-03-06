// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import axios from "axios";

import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

import "./assets/css/index.css";
import "github-markdown-css/github-markdown.css";

import Highlight from "./utils/highlight";

Vue.use(Highlight);

//axios.defaults.withCredentials = true

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(mavonEditor);
/*Vue.use(VueAxios,axios)*/

axios.defaults.baseURL = "http://localhost:3000/api";
Vue.prototype.$axios = axios;

//请求拦截?????

axios.interceptors.request.use((config) => {
  if (localStorage.elementToken) {
    config.headers.Authorization = "Bearer " + localStorage.elementToken;
  }
  return config;
});
//响应拦截
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err);
    // Message.error(err.response.data)
  }
);

//路由守卫
/*router.beforeEach((to,from,next) =>{
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
})*/

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
});
