import { serializeUserJwt } from '@/helpers/serializeUserJwt'
import type { ISigninParams } from '@/interfaces/ISigninParams'
import { authService, jwtService, storageService } from '@/services'
import type { JwtDecoded } from '@/services/jwt/jwt.service'
import { defineStore } from 'pinia'
import { computed, getCurrentInstance, onBeforeMount, onMounted, reactive, ref } from 'vue'

export interface UserState {
  id: number | undefined
  email: string | undefined
}

const accessToken = storageService.getItem('accessToken')

const userJwt: JwtDecoded | null = accessToken ? jwtService.decode(accessToken) : null

const userLoaded: UserState | null = userJwt ? serializeUserJwt(userJwt) : null

export const useAuthStore = defineStore('auth', () => {
  const user = reactive<UserState>({
    id: userLoaded?.id,
    email: userLoaded?.email
  })

  const isAuthenticated = computed(() => {
    return !!user.id
  })

  async function signin(signinParams: ISigninParams): Promise<UserState> {
    try {
      const res = await authService.signin(signinParams)

      const decoded: JwtDecoded = jwtService.decode(res.accessToken)

      storageService.setItem('accessToken', res.accessToken)

      const newUserState = { id: decoded.sub, email: decoded.email }
      Object.assign(user, newUserState)

      return newUserState
    } catch (error) {
      throw error
    }
  }

  async function logout() {
    storageService.removeItem('accessToken')
    user.email = undefined
    user.id = undefined
  }

  return {
    user,
    signin,
    isAuthenticated
  }
})
