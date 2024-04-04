import { createRouter, createWebHistory } from 'vue-router'

// Router configs
import { metadataRoutes } from '@/router/RoutesConfig'

// Guards
import { authGuard, redirectToHomeIfAuthenticatedGuard } from './RoutesGuards'

// Components
import Signin from '@/views/Signin.vue'
import Signup from '@/views/Signup.vue'
import NavMenu from '@/views/NavMenu.vue'
import ProfileUserView from '@/views/ProfileUserView.vue'
import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'

export const router = createRouter({
  linkActiveClass: 'text-blue-500 font-bold',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: metadataRoutes.SIGNIN.path,
      name: metadataRoutes.SIGNIN.name,
      components: {
        default: Signin
      }
    },
    {
      path: metadataRoutes.SIGNUP.path,
      name: metadataRoutes.SIGNUP.name,
      components: {
        default: Signup
      }
    },
    {
      path: metadataRoutes.HOME.path,
      name: metadataRoutes.HOME.name,
      components: {
        Navbar: NavMenu,
        default: HomeView
      }
    },
    {
      path: metadataRoutes.USER_PROFILE.path,
      name: metadataRoutes.USER_PROFILE.name,
      components: {
        Navbar: NavMenu,
        default: ProfileUserView
      }
    },
    {
      path: metadataRoutes.ABOUT.path,
      name: metadataRoutes.ABOUT.name,
      components: {
        Navbar: NavMenu,
        default: AboutView
      }
    },
    { path: '/:pathMatch(.*)*', redirect: metadataRoutes.HOME.path }
  ]
})

router.beforeEach(authGuard)

router.beforeEach(redirectToHomeIfAuthenticatedGuard)

export default router
