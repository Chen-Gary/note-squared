import Vue from 'vue'
import Router from 'vue-router'
import Register from "../components/Register";
import Editor from "../components/Editor";
import Login from "../components/Login";
//import Login from "../components/Login2";
import Forget_password from "../components/Forget_password";
import Home from "../components/Home";
import HomeNavBar from "../components/HomeNavBar"
import Bookshelf from "../components/bookshelf/Bookshelf";
import NoteEdit from "../components/note/NoteEdit";
import NoteDetail from "../components/note/NoteDetail";
import Community from "../components/note_community/Community";
import Admin_ChangeProfile from "../components/admin/Admin_ChangeProfile";
import ViewArticle from "../components/note/ViewArticle";
import PersonalCenter from "../pages/UserCenter"
import UserInfo from "../pages/UserInfo"
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
      redirect:'/',
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
      path: '/',
      name: 'HomeNavBar',
      component: HomeNavBar,
      redirect:'/note/view',
      children: [
      {
        path: '/note/edit/:id?/:folder?/:visibility?',
        name: 'NoteEdit',
        component: NoteEdit,
      },
    ]
    },
    {
      path: '/',
      name: 'HomeNavBar',
      component: HomeNavBar,
      redirect:'/note/view',
      children: [
      {
        path: '/note/view',
        name: 'ViewArticle',
        component: ViewArticle
      },
    ]
    },
    {
      path: '/',
      name: 'HomeNavBar',
      component: HomeNavBar,
      redirect:'/admin',
      children: [
      {
        path:'/admin',
        name:'/admin',
        component: Admin_ChangeProfile
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
          path: '/personal-center',
          name: 'PersonalCenter',
          component: PersonalCenter
        },
    ]
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
