import { createRouter, createWebHistory } from 'vue-router'

// Router configs
import { metadataRoutes } from '@/router/RoutesConfig'

// Guards
import { authGuard, redirectToHomeIfAuthenticatedGuard } from './RoutesGuards'

// Views
import UserProfileView from '@/views/UserProfileView.vue'
import Signin from '@/views/Signin.vue'
import Signup from '@/views/Signup.vue'
import NavMenu from '@/views/NavMenu.vue'
import AboutView from '@/views/AboutView.vue'
import ProfileEdit from '@/views/ProfileEdit.vue'
import HomeView from '@/views/HomeView.vue'
import ProjectView from '@/views/ProjectView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import PostView from '@/components/PostView.vue'
import AnnouncementView from '@/views/AnnouncementView.vue'

// Components
import PostsFeed from '@/components/PostsFeed.vue'
import ProjectsFeed from '@/components/ProjectsFeed.vue'

export const router = createRouter({
  linkActiveClass: 'text-white',
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
      children: [
        {
          path: '',
          name: 'posts',
          component: PostsFeed
        },
        {
          path: 'projects',
          name: 'projects',
          component: ProjectsFeed
        }
      ],
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
        default: UserProfileView
      },
      props: true,
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
    {
      path: metadataRoutes.PROJECT.path,
      name: metadataRoutes.PROJECT.name,
      components: {
        Navbar: NavMenu,
        default: ProjectView
      },
      props: true,
      meta: { ...metadataRoutes.PROJECT }
    },
    {
      path: metadataRoutes.POST.path,
      name: metadataRoutes.POST.name,
      components: {
        Navbar: NavMenu,
        default: PostView
      },
      props: true
    },
    {
      path: metadataRoutes.ANNOUNCEMENT.path,
      name: metadataRoutes.ANNOUNCEMENT.name,
      components: {
        Navbar: NavMenu,
        default: AnnouncementView
      }
    },
    {
      path: metadataRoutes.NOT_FOUND.path,
      name: metadataRoutes.NOT_FOUND.name,
      component: NotFoundView
    },

    { path: '/:pathMatch(.*)*', redirect: metadataRoutes.HOME.path }
  ]
})

router.beforeEach(authGuard)

router.beforeEach(redirectToHomeIfAuthenticatedGuard)

export default router
