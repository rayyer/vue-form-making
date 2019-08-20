import Vue from 'vue'
import Router from 'vue-router'

import Home from '../demo/Home.vue'
import Form from '../demo/Form.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/form',
      name: 'form',
      component: Form
    }
  ]
})