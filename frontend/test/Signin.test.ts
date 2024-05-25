import { mount, flushPromises } from '@vue/test-utils'
import Signin from '../src/views/Signin.vue'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '../src/stores/auth'
import { useRouter } from 'vue-router'
import { mockedStore } from './helpers/mocked-store'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}))

describe('Signin', () => {
  let push

  beforeEach(() => {
    push = vi.fn()

    // @ts-ignore
    useRouter.mockImplementationOnce(() => ({
      push
    }))
  })

  test('should redirect to the home page if login is successful.', async () => {
    const wrapper = mount(Signin, {
      global: {
        plugins: [createTestingPinia({})]
      }
    })

    const authStore = mockedStore(useAuthStore)

    authStore.signin.mockResolvedValueOnce({
      id: 1,
      email: 'luizgustavooumbelino@gmail.com'
    })

    const inputEmail = wrapper.find('input[name="email"]')
    const inputPassword = wrapper.find('input[name="password"]')

    await inputEmail.setValue('luizgustavooumbelino@gmail.com')
    await inputPassword.setValue('123456')

    await wrapper.find('form').trigger('submit')

    // await flushPromises()

    await new Promise((resolve) => setTimeout(resolve, 40))

    expect(push).toHaveBeenCalledTimes(1)
    expect(authStore.signin).toHaveBeenCalledTimes(1)
  })
})
