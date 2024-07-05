// router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('@/views/Posts/index.vue')
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('@/views/Post/index.vue')
    },
    {
      path: '/collect',
      name: 'collect',
      component: () => import('@/views/Collect/index.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/Search/index.vue')
    },
    {
      path: '/create-post',
      name: 'create-post',
      component: () => import('@/views/CreatePost/index.vue')
    },
    {
      path: '/edit-post/:id',
      name: 'edit-post',
      component: () => import('@/views/EditPost/index.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFound/index.vue'),
    },
  ]
})

export default router