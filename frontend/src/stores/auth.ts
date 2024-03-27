import type { ISigninParams } from '@/interfaces/ISigninParams'
import type { ISignupParams } from '@/interfaces/ISignupParams'
import { authService, jwtService } from '@/services'
import type { Decoded } from '@/services/jwt/jwt.service'
import { defineStore } from 'pinia'
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'

export interface UserState {
  id: any | null
  email: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const user: UserState = reactive({
    id: null,
    email: null
  })

  async function signin(signinParams: ISigninParams): Promise<UserState> {
    try {
      const res = await authService.signin(signinParams)

      const decoded: Decoded = jwtService.decode(res.accessToken)

      const newUserState = { id: decoded.sub, email: decoded.email }
      Object.assign(user, newUserState)

      return newUserState
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async function signup(signupParams: ISignupParams) {}

  if (getCurrentInstance()) {
    onMounted(() => {
      console.log('AUTH STORE!')
    })
  }

  return {
    user,
    signin
  }
})
