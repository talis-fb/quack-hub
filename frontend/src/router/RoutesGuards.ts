import { useAuthStore } from '@/stores/auth'
import type { NavigationGuardWithThis } from 'vue-router'
import { metadataRoutes, publicRoutes } from './RoutesConfig'

export const authGuard: NavigationGuardWithThis<undefined> = async (to, _) => {
  const { isAuthenticated } = useAuthStore()
  const authRequired = !to.meta.isPublic

  if (authRequired && !isAuthenticated) {
    return { name: metadataRoutes.SIGNIN.name }
  }
}

export const redirectToHomeIfAuthenticatedGuard: NavigationGuardWithThis<undefined> = async (
  to,
  _
) => {
  const { isAuthenticated } = useAuthStore()

  const requireNoAuth = to.meta?.tags?.includes('require-no-auth') as boolean

  if (requireNoAuth && isAuthenticated) {
    return { name: metadataRoutes.HOME.name }
  }
}
