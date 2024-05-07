export const metadataRoutes = {
  SIGNIN: {
    path: '/signin',
    name: 'signin',
    isPublic: true,
    tags: ['require-no-auth']
  },
  SIGNUP: {
    path: '/signup',
    name: 'signup',
    isPublic: true,
    tags: ['require-no-auth']
  },
  POST: {
    path: '/post/:id',
    name: 'post'
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
    path: '/user-profile/:id',
    name: 'user-profile'
  },
  USER_EDIT: {
    path: '/edit',
    name: 'user-edit'
  },
  PROJECT: {
    path: '/project/:id',
    name: 'project'
  },
  NOT_FOUND: {
    path: '/404',
    name: 'not-found'
  }
}

export const publicRoutes = [metadataRoutes.SIGNIN.path, metadataRoutes.SIGNUP.path]
