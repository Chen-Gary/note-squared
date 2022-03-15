import Vue from 'vue'
import Router from 'vue-router'
import Register from "../components/Register";
import Editor from "../components/Editor";
import Login from "../components/Login";
import Home from "../components/Home";
import HomeNavBar from "../components/HomeNavBar"
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeNavBar',
      component: HomeNavBar,
      redirect:'/Home',
      children: [
      {
        path: '/Home',
        name: 'Home',
        component: Home,
      }]
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
