export const metadataRoutes = {
  SIGNIN: {
    path: '/signin',
    name: 'signin'
  },
  SIGNUP: {
    path: '/signup',
    name: 'signup'
  },
  HOME: {
    path: '/',
    name: 'home'
  },
  NAVBAR: {
    path: '/nav-bar',
    name: 'nav-bar'
  },
  ABOUT: {
    path: '/about',
    name: 'about'
  },
  USER_PROFILE: {
    path: '/user-profile',
    name: 'user-profile'
  }
}

export const publicRoutes = [metadataRoutes.SIGNIN.path, metadataRoutes.SIGNUP.path]
