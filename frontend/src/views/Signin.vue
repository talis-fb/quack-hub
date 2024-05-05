<script setup lang="ts">
// Zod
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// Componentes
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
import { useToast } from '@/components/ui/toast/use-toast'
import BaseAuth from '@/components/BaseAuth.vue'

// Pinia
import { useAuthStore } from '@/stores/auth'

// Vue Riuter
import router from '../router/index'

// Lifecycle Hooks
import { onUnmounted } from 'vue'

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({
        required_error: 'Campo email obrigatório'
      })
      .min(1, { message: 'Esse campo deve ser preenchido.' })
      .email('Esse não é um e-mail válido.'),
    password: z.string({
      required_error: 'Campo senha obrigatório'
    }).min(5, { message: 'Senha deve ter no mínimo 5 caracteres.' })
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
      name: 'posts'
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
  <BaseAuth>
    <template v-slot:main>
      <main>
        <header class="text-center mb-5">
          <h1 class="text-2xl font-semibold">Login</h1>
          <small class="text-sm text-muted-foreground">
            Entre no sistema para poder desfrutar das funcionalidades.
          </small>
        </header>
        <form @submit="onSubmit" class="w-full max-w-[450px]">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
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
      </main>

      <footer class="mt-5">
        <p>
          Não tem uma conta?
          <span
            @click="navigateToSignup"
            class="cursor-pointer font-bold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary hover:after:w-[95%] after:transition-all after:ease-in-out after:duration-300"
          >
            Registra-se
          </span>
        </p>
      </footer>
    </template>
  </BaseAuth>
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
