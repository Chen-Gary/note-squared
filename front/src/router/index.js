import Vue from 'vue'
import Router from 'vue-router'
import Register from "../components/Register";
import Editor from "../components/Editor";
import Login from "../components/Login";
import Forget_password from "../components/Forget_password";
import Home from "../components/Home";
import HomeNavBar from "../components/HomeNavBar"
import test from "../components/test"
import Bookshelf from "../components/bookshelf/Bookshelf";
import NoteEdit from "../components/note/NoteEdit";
import NoteDetail from "../components/note/NoteDetail";
import Community from "../components/note_community/Community";
import Admin_ChangeProfile from "../components/admin/Admin_ChangeProfile";
import ViewArticle from "../components/note/ViewArticle";
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
      },
    ]
    },
    {
      path: '/',
      name: 'HomeNavBar',
      component: HomeNavBar,
      redirect:'/login',
      children: [
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
    ]
    },
    {
      path: '/',
      name: 'HomeNavBar',
      component: HomeNavBar,
      redirect:'/register',
      children: [
      {
        path: '/register',
        name: 'Register',
        component: Register
      },
    ]
    },
    {
      path: '/',
      name: 'HomeNavBar',
      component: HomeNavBar,
      redirect:'/forget',
      children: [
      {
          path: '/forget',
          name: 'Forget_password',
          component: Forget_password,
      },
    ]
    },
    {
      path: '/',
      name: 'HomeNavBar',
      component: HomeNavBar,
      redirect:'/community',
      children: [
      {
          path: '/community',
          name: 'Community',
          component: Community,
      },
    ]
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
    {
      path: '/note/view',
      name: 'ViewArticle',
      component: ViewArticle
    }

  ]
})
