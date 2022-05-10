import Vue from 'vue'
import { shallowMount } from '@vue/test-utils';
import Login from '@/components/Login'
import ElementUI from 'element-ui';

const localVue = createLocalVue()
localVue.use(ElementUI)

it('创建表空间', () => {
    const wrapper = shallowMount(Login, {localVue})
    const vm= wrapper.vm
    const mockFn = jest.fn()
    wrapper.setData({
      dbs: dbsMock,
      currentDB: 'test',
    })
    wrapper.setMethods({
      getTabs: mockFn,
    })
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          data: {},
          error_code: 0,
          message: '',
        },
      })
    })
    vm.handlePostCreateTab()
    Vue.nextTick(() => {
      Vue.nextTick(() => {
        expect(mockFn).toHaveBeenCalled()
        expect(vm.openAddTabModal).toBeFalsy()
      })
    })
  })
