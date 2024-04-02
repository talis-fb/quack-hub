export const metadataRoutes = {
  SIGNIN: {
    path: '/signin',
    name: 'signin',
    isPublic: true,
    tags: ['require-no-auth'],
  },
  SIGNUP: {
    path: '/signup',
    name: 'signup',
    isPublic: true,
    tags: ['require-no-auth'],
  },
  HOME: {
    path: '/',
    isPublic: true,
    name: 'home'
  },
  ABOUT: {
    path: '/about',
    name: 'about'
  },
  USER_PROFILE: {
    path: '/user-profile',
    name: 'user-profile'
  },
  USER_EDIT: {
    path: '/edit',
    name: 'user-edit'
  }
}

export const publicRoutes = [metadataRoutes.SIGNIN.path, metadataRoutes.SIGNUP.path]
