import { createRouter, createWebHistory } from 'vue-router'
import {HomeView, AboutView, LoginView} from '../views'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: to => {
        // the function receives the target route as the argument
        // a relative location doesn't start with `/`
        // or { path: 'profile'}
        return 'login'
      },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
  ]
})

export default router
