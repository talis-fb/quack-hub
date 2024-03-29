<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Auth from '@/components/Auth.vue'

import { useAuthStore } from '@/stores/auth'

import router from '../router/index'
import { useToast } from '@/components/ui/toast/use-toast'
import { onUnmounted } from 'vue'

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, { message: 'Esse campo deve ser preenchido.' })
      .email('Esse não é um e-mail válido.'),
    password: z.string().min(5, { message: 'Senha deve ter no mínimo 5 caracteres.' })
  })
)

const form = useForm({
  validationSchema: formSchema
})

const { toast, dismiss } = useToast()

const { signin } = useAuthStore()

const onSubmit = form.handleSubmit(async (values) => {
  const { email, password } = values

  try {
    const userState = await signin({ email, password })

    if (!userState) return

    router.push({
      name: 'home'
    })
  } catch (error) {
    toast({
      title: 'Erro ao efetuar login.',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
})

const navigateToSignup = (e: MouseEvent) => {
  router.push({
    name: 'signup'
  })
}

onUnmounted(() => {
  dismiss()
})
</script>

<template>
  <Auth>
    <template v-slot:main>
      <div class="text-center mb-5">
        <h1 class="text-2xl font-semibold">Login</h1>
        <p class="text-sm text-muted-foreground">
          Entre no sistema para poder desfrutar das funcionalidades.
        </p>
      </div>
      <form @submit="onSubmit" class="w-full max-w-[450px]">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel />
            <FormControl>
              <Input
                type="email"
                placeholder="Email..."
                v-bind="componentField"
                autocomplete="email"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel />
            <FormControl>
              <Input
                type="password"
                placeholder="Senha..."
                v-bind="componentField"
                autocomplete="current-password"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" class="w-full">Entrar</Button>
      </form>
      <div class="mt-5">
        <p>
          Não tem uma conta?
          <span
            @click="navigateToSignup"
            class="font-bold cursor-pointer relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary hover:after:w-[95%] after:transition-all after:ease-in-out after:duration-300"
            >Registra-se</span
          >
        </p>
      </div>
    </template>
  </Auth>
</template>

<style>
/* .signup-text {
  position: relative;
  padding-bottom: 0.3rem;
}
.signup-text::after {
  left: 0;
  bottom: 0;

  position: absolute;
  content: '';
  height: 2px;
  width: 0;
  transition: all 0.3s ease;
  background-color: var(--primary);
}

.signup-text:hover::after {
  width: 70%;
} */
</style>
