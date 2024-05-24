import { mount, flushPromises } from '@vue/test-utils'
import Signin from '../src/views/Signin.vue'
import { expect, test, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '../src/stores/auth'
import { ISigninParams } from '../src/types/ISigninParams'
import { useRouter } from 'vue-router'
import { beforeEach } from 'node:test'

test('renders a form', async () => {
  const mockRouter = {
    push: vi.fn()
  }

  const wrapper = mount(Signin, {
    global: {
      plugins: [
        createTestingPinia({
          //   initialState: {
          //     auth: {
          //       user: {
          //         id: 1,
          //         email: 'luizgustavooumbelino@gmail.com'
          //       }
          //     }
          //   }
        })
      ]
    }
  })

  const inputEmail = wrapper.find('input[name="email"]')
  const inputPassword = wrapper.find('input[name="password"]')

  const authStore = useAuthStore()

  await inputEmail.setValue('luizgustavooumbelino@gmail.com')
  await inputPassword.setValue('123456')

  await wrapper.find('form').trigger('submit')

  //   await flushPromises()

  await new Promise((resolve) => setTimeout(resolve, 50))

  expect(authStore.signin).toHaveBeenCalledTimes(1)
})
