import { useAuthStore } from '@/stores/auth'
import type { NavigationGuardWithThis } from 'vue-router'
import { metadataRoutes, publicRoutes } from './RoutesConfig'

export const authGuard: NavigationGuardWithThis<undefined> = async (to, _) => {
  const { isAuthenticated } = useAuthStore()

  const authRequired = !publicRoutes.includes(to.path)

  if (authRequired && !isAuthenticated) {
    return { name: metadataRoutes.SIGNIN.name }
  }
}

export const redirectToHomeIfAuthenticatedGuard: NavigationGuardWithThis<undefined> = async (
  to,
  _
) => {
  const { isAuthenticated } = useAuthStore()

  const authNotRequired = publicRoutes.includes(to.path)

  if (authNotRequired && isAuthenticated) {
    return { name: metadataRoutes.HOME.name }
  }
}
