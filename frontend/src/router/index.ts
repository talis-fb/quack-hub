import { metadataRoutes, publicRoutes } from '@/router/RoutesConfig'
import { createRouter, createWebHistory } from 'vue-router'
import { authGuard, redirectToHomeIfAuthenticatedGuard } from './RoutesGuards'

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
      path: metadataRoutes.USER_PROFILE.path,
      name: metadataRoutes.USER_PROFILE.name,
      component: () => import('@/views/ProfileUserView.vue')
    },
    {
      path: metadataRoutes.ABOUT.path,
      name: metadataRoutes.ABOUT.name,
      component: () => import('@/views/AboutView.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: metadataRoutes.HOME.path }
  ]
})

//router.beforeEach(authGuard)

router.beforeEach(redirectToHomeIfAuthenticatedGuard)

export default router
