import Vue from 'vue'
import { mount,createLocalVue } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'node_modules/element-ui/lib/theme-chalk/index.css';
import 'node_modules/element-ui/lib/utils/types.js';
import 'node_modules/element-ui/lib/utils/util.js';
import 'node_modules/element-ui/lib/locale/format.js';

const localVue = createLocalVue()
localVue.use(ElementUI)
// // localVue.use(VueRouter)
// // const router = new VueRouter()

describe('Register.vue', () => {
  let wrapper = mount(Login, {localVue})
  it('button click test', () => {
    console.log(wrapper)
    expect(wrapper.html()).toContain('Login')
    // const confirmBtn = vm.$el.querySelector('.form-confirm')
    // expect(confirmBtn.textContent).toEqual('Login')
  })
})

// describe('HelloWorld.vue', () => {
//   it('should render correct contents', () => {
//     const Constructor = Vue.extend(Login)
//     const vm = new Constructor().$mount()
//     expect(vm.$el.querySelector('.form-confirm').textContent)
//       .toEqual('Login')
//   })
// })
