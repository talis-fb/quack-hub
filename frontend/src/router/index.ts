import { metadataRoutes, publicRoutes } from '@/router/RoutesConfig'
import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './RoutesGuards'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: metadataRoutes.SIGNIN.path,
      name: metadataRoutes.SIGNIN.name,
      component: () => import('@/views/Signin.vue')
    },
    {
      path: metadataRoutes.SIGNUP.path,
      name: metadataRoutes.SIGNUP.name,
      component: () => import('@/views/Signup.vue')
    },
    {
      path: metadataRoutes.HOME.path,
      name: metadataRoutes.HOME.name,
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: () => import('@/views/ProfileUserView.vue')
    },
    {
      path: metadataRoutes.ABOUT.path,
      name: metadataRoutes.ABOUT.path,
      component: () => import('@/views/AboutView.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: metadataRoutes.HOME.path }
  ]
})

router.beforeEach(authGuard)

export default router
