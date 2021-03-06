import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import demo01 from '@/components/demo01'
import demo02 from '@/components/demo02'
import demo03 from '@/components/demo03'
import demo04 from '@/components/demo04'
import demo05 from '@/components/demo05'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/01',
      name: 'demo01',
      component: demo01
    },
    {
      path: '/02',
      name: 'demo02',
      component: demo02
    },
    {
      path: '/03',
      name: 'demo03',
      component: demo03
    },
    {
      path: '/04',
      name: 'demo04',
      component: demo04
    },
    {
      path: '/05',
      name: 'demo05',
      component: demo05
    }
  ]
})
