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
  ABOUT: {
    path: '/about',
    name: 'about'
  }
}

export const publicRoutes = [metadataRoutes.SIGNIN.path, metadataRoutes.SIGNUP.path]
