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
import ProfileEdit from '@/views/ProfileEdit.vue'
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
      },
      meta: { ...metadataRoutes.SIGNIN }
    },
    {
      path: metadataRoutes.SIGNUP.path,
      name: metadataRoutes.SIGNUP.name,
      components: {
        default: Signup
      },
      meta: { ...metadataRoutes.SIGNUP }
    },
    {
      path: metadataRoutes.HOME.path,
      name: metadataRoutes.HOME.name,
      components: {
        Navbar: NavMenu,
        default: HomeView
      },
      meta: { ...metadataRoutes.SIGNUP }
    },
    {
      path: metadataRoutes.USER_PROFILE.path,
      name: metadataRoutes.USER_PROFILE.name,
      components: {
        Navbar: NavMenu,
        default: ProfileUserView
      },
      meta: { ...metadataRoutes.USER_PROFILE }
    },
    {
      path: metadataRoutes.ABOUT.path,
      name: metadataRoutes.ABOUT.name,
      components: {
        Navbar: NavMenu,
        default: AboutView
      },
      meta: { ...metadataRoutes.ABOUT }
    },
    {
      path: metadataRoutes.USER_EDIT.path,
      name: metadataRoutes.USER_EDIT.name,
      components: {
        Navbar: NavMenu,
        default: ProfileEdit
      },
      meta: { ...metadataRoutes.USER_EDIT }
    },
    { path: '/:pathMatch(.*)*', redirect: metadataRoutes.HOME.path }
  ]
})

router.beforeEach(authGuard)

router.beforeEach(redirectToHomeIfAuthenticatedGuard)

export default router
