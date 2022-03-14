import Vue from 'vue'
import Router from 'vue-router'
import Register from "../components/Register";
import Editor from "../components/Editor";
import Login from "../components/Login";
import Home from "../components/Home";

Vue.use(Router)
export default new Router({
  routes: [
    {
      path:'/Home',
      name:'Home',
      component: Home
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Editor',
      name: 'Editor',
      component: Editor
    }
  ]
})
