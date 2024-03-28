import type { ISigninParams } from '@/interfaces/ISigninParams'
import type { ISignupParams } from '@/interfaces/ISignupParams'
import { authService, jwtService } from '@/services'
import type { Decoded } from '@/services/jwt/jwt.service'
import { defineStore } from 'pinia'
import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue'

export interface UserState {
  id: any | null
  email: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const user: UserState = reactive({
    id: null,
    email: null
  })

  const isAuthenticated = computed(() => {
    return !!user.id
  })

  async function signin(signinParams: ISigninParams): Promise<UserState> {
    try {
      const res = await authService.signin(signinParams)

      const decoded: Decoded = jwtService.decode(res.accessToken)

      const newUserState = { id: decoded.sub, email: decoded.email }
      Object.assign(user, newUserState)

      return newUserState
    } catch (error) {
      throw error
    }
  }

  if (getCurrentInstance()) {
    onMounted(() => {
      console.log('AUTH STORE!')
    })
  }

  return {
    user,
    signin,
    isAuthenticated
  }
})
