import { mount, flushPromises } from '@vue/test-utils'
import Signin from '../src/views/Signin.vue'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '../src/stores/auth'
import { useRouter } from 'vue-router'
import { mockedStore } from './helpers/mocked-store'
import { HttpException } from '../src/exceptions/HttpException'

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

  test('should render a error message if the field email is empty', async () => {
    const wrapper = mount(Signin, {
      global: {
        plugins: [createTestingPinia({})]
      }
    })

    await wrapper.find('form').trigger('submit')

    await new Promise((resolve) => setTimeout(resolve, 40))

    expect(wrapper.html()).toContain('Campo email obrigatório')
  })

  test('should render a error message if the field email is not an email', async () => {
    const wrapper = mount(Signin, {
      global: {
        plugins: [createTestingPinia({})]
      }
    })

    await wrapper.find('input[name="email"]').setValue('luiz')

    await wrapper.find('form').trigger('submit')

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.html()).toContain('Esse não é um e-mail válido.')
  })

  test('should render a error message if the field password is empty', async () => {
    const wrapper = mount(Signin, {
      global: {
        plugins: [createTestingPinia({})]
      }
    })

    await wrapper.find('form').trigger('submit')

    await new Promise((resolve) => setTimeout(resolve, 40))

    expect(wrapper.html()).toContain('Campo senha obrigatório')
  })

  test('should render a error message if the field password is less than 5 characters', async () => {
    const wrapper = mount(Signin, {
      global: {
        plugins: [createTestingPinia({})]
      }
    })

    await wrapper.find('input[name="password"]').setValue('123')

    await wrapper.find('form').trigger('submit')

    await new Promise((resolve) => setTimeout(resolve, 40))

    expect(wrapper.html()).toContain('Senha deve ter no mínimo 5 caracteres.')
  })

  test('should redirect to the home page if login is successful', async () => {
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

    await new Promise((resolve) => setTimeout(resolve, 40))

    expect(push).toHaveBeenCalledTimes(1)
    expect(authStore.signin).toHaveBeenCalledTimes(1)
  })

  test('should not redirect to home page if login is unsuccessful', async () => {
    const wrapper = mount(Signin, {
      global: {
        plugins: [createTestingPinia({})]
      }
    })

    const authStore = mockedStore(useAuthStore)

    authStore.signin.mockRejectedValueOnce(new HttpException('E-mail ou senha incorretos.'))

    const inputEmail = wrapper.find('input[name="email"]')
    const inputPassword = wrapper.find('input[name="password"]')

    await inputEmail.setValue('luizgustavooumbelino@gmail.com')
    await inputPassword.setValue('123456')

    await wrapper.find('form').trigger('submit')

    await new Promise((resolve) => setTimeout(resolve, 40))

    expect(push).not.toHaveBeenCalled()
  })
})
