import Vue from 'vue'
import Router from 'vue-router'
import Register from "../components/Register";
import Editor from "../components/Editor";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Editor',
      component: Editor
    }
  ]
})
