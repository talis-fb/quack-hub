import { serializeUserJwt } from '@/helpers/serializeUserJwt'
import type { ISigninParams } from '@/types/ISigninParams'
import { authService, jwtService, storageService } from '@/services'
import type { JwtDecoded } from '@/services/jwt/jwt.service'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { authApi } from '@/apis'

export interface UserState {
  id: number | undefined
  email: string | undefined
}

async function verifyToken() {
  await authApi.meVerifyToken()
}

function loadUser(): UserState | null {
  const accessToken = storageService.getItem('access_token')

  const userJwt: JwtDecoded | null = accessToken ? jwtService.decode(accessToken) : null

  const userLoaded: UserState | null = userJwt ? serializeUserJwt(userJwt) : null

  return userLoaded
}

const userLoaded: UserState | null = loadUser()

export const useAuthStore = defineStore('auth', () => {
  const user: UserState = reactive({
    id: userLoaded?.id,
    email: userLoaded?.email
  })

  const isAuthenticated = computed(() => {
    return !!user.id
  })

  async function signin(signinParams: ISigninParams): Promise<UserState> {
    try {
      const res = await authService.signin(signinParams)

      console.log('-----res------')
      

      const decoded: JwtDecoded = jwtService.decode(res.access_token)

      storageService.setItem('access_token', res.access_token)

      const newUserState = { id: decoded.sub, email: decoded.email }
      Object.assign(user, newUserState)

      console.log(res)
      console.log(decoded)
      console.log(newUserState)
      console.log(user)
      console.log('-----------')

      return newUserState
    } catch (error) {
      throw error
    }
  }

  async function logout() {
    storageService.removeItem('access_token')
    user.email = undefined
    user.id = undefined
  }

  return {
    user,
    signin,
    logout,
    isAuthenticated
  }
})
