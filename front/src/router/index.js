import Vue from 'vue'
import Router from 'vue-router'
import Register from "../components/Register";
import Editor from "../components/Editor";
import Login from "../components/Login";
import Home from "../components/Home";
import HomeNavBar from "../components/HomeNavBar"
import test from "../components/test"
import Bookshelf from "../components/bookshelf/Bookshelf";
import NoteEdit from "../components/note/NoteEdit";
import NoteDetail from "../components/note/NoteDetail";
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
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/bookshelf',
      name: 'Bookshelf',
      component: Bookshelf,
    },
    {
      path: '/note/edit',
      name: 'NoteEdit',
      component: NoteEdit,
    },
    {
      path: '/note/detail',
      name: 'NoteDetail',
      component: NoteDetail,
    },

  ]
})
