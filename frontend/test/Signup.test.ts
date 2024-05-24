import { mount } from '@vue/test-utils'
import Signup from '../src/views/Signup.vue'
import { expect, test } from 'vitest'

// FIX: Pesquisar como resolver o problema de não conseguir testar o componente Signup sem usar o timeout

test('renders a form', async () => {
  const wrapper = mount(Signup)

  expect(wrapper.find('form').exists()).toBe(true)
})

// test('renders a signup form', async () => {
//   const wrapper = mount(Signup)

//   expect(wrapper.html()).toContain('Nome')
//   expect(wrapper.html()).toContain('Email')
//   expect(wrapper.html()).toContain('Senha')
//   expect(wrapper.html()).toContain('Confirmar senha')
//   expect(wrapper.html()).toContain('Data de aniversário')
// })

// test('renders a error message when the two password dont match', async () => {
//   const wrapper = mount(Signup)
//   const inputName = wrapper.find('input[name="name"]')
//   const inputEmail = wrapper.find('input[name="email"]')
//   const inputPassword = wrapper.find('input[name="password"]')
//   const inputConfirmPassword = wrapper.find('input[name="confirmPassword"]')

//   await inputName.setValue('John Doe')
//   await inputEmail.setValue('john-doe@gmail.com')
//   await inputPassword.setValue('123456')
//   await inputConfirmPassword.setValue('xxxxxxxxxxx')

//   await wrapper.find('form').trigger('submit')

//   await new Promise((resolve) => setTimeout(resolve, 50))

//   expect(wrapper.html()).toContain('Senhas não correspondem')
// })

// test('renders error messages when form is submitted with invalid data', async () => {
//   const wrapper = mount(Signup)

//   await wrapper.find('form').trigger('submit')

//   await new Promise((resolve) => setTimeout(resolve, 4))

//   expect(wrapper.html()).toContain('Campo nome obrigatório')
//   expect(wrapper.html()).toContain('Campo email obrigatório')
//   expect(wrapper.html()).toContain('Campo senha obrigatório')
//   expect(wrapper.html()).toContain('Campo confirmar senha obrigatório')
//   expect(wrapper.html()).toContain('Campo aniversário obrigatório')
// })
