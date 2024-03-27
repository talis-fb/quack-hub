import type { ISigninParams } from '@/interfaces/ISigninParams'
import type { ISignupParams } from '@/interfaces/ISignupParams'
import { authService } from '@/services'
import type { IAuthService } from '@/services/auth/auth.service'
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

  async function signin(signinParams: ISigninParams) {
    const res = await authService.signin(signinParams);

    console.log({res})

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
