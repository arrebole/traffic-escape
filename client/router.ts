import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Take from './views/Take.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/:hash',
      name: 'Take',
      component: Take
    },
    {
      path: '*',
      name: 'notFound',
      redirect: "/"
    }
  ]
})
