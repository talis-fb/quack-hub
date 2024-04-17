<script setup lang="ts">
// zod
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// shadcn-vue
import { cn } from '@/lib/utils'
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
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarIcon, ArrowLeft } from 'lucide-vue-next'

// Components
import BaseAuth from '@/components/BaseAuth.vue'

// router
import router from '../router/index'

// date-fns
import { formatDateInFull } from '@/utils/DateFormat'
import { authService } from '@/services'
import { useToast } from '@/components/ui/toast/use-toast'
import { onUnmounted } from 'vue'

const formSchema = toTypedSchema(
  z
    .object({
      name: z.string({
        required_error: 'Campo nome obrigatório'
      }).min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
      email: z
        .string({
          required_error: 'Campo email obrigatório'
        })
        .min(1, { message: 'Esse campo deve ser preenchido.' })
        .email('Esse não é um e-mail válido.'),
      password: z.string({
        required_error: 'Campo senha obrigatório'
      }).min(5, { message: 'Senha deve ter no mínimo 5 caracteres.' }),
      confirmPassword: z.string({
        required_error: 'Campo confirmar senha obrigatório'
      }),
      birthday: z.date({
        required_error: 'Campo aniversário obrigatório'
      })
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Senhas não correspondem',
      path: ['confirmPassword']
    })
)

const form = useForm({
  validationSchema: formSchema
})

const { toast, dismiss } = useToast()

const onSubmit = form.handleSubmit(async (values) => {
  const { confirmPassword, ...restValues } = values
  try {
    const res = await authService.signup(restValues)

    form.resetForm()
    toast({
      title: 'Conta cadastrada com sucesso.',
      description: 'Agora você poderá utilizar as funcionalidads do sistema!'
    })
  } catch (error) {
    toast({
      title: 'Erro ao efetuar o cadastro.',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
})

const navigateToLogin = (e: MouseEvent) => {
  router.push({
    name: 'signin'
  })
}

onUnmounted(() => {
  dismiss()
})
</script>

<template>
  <BaseAuth>
    <template v-slot:main>
      <button
        @click="navigateToLogin"
        class="flex gap-1 absolute left-5 top-5 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary hover:after:w-[95%] after:transition-all after:ease-in-out after:duration-300"
      >
        <ArrowLeft />
        <span>Login</span>
      </button>

      <main>
        <header class="text-center mb-5">
          <h1 class="text-2xl font-semibold">Registro</h1>
          <p class="text-sm text-muted-foreground">
            Registre-se no sistema para poder desfrutar das funcionalidades.
          </p>
        </header>
        <form @submit="onSubmit" class="w-full max-w-[450px]">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel />
              <FormControl>
                <Input
                  type="text"
                  placeholder="Nome..."
                  v-bind="componentField"
                  autocomplete="name"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
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
          <FormField v-slot="{ componentField }" name="confirmPassword">
            <FormItem>
              <FormLabel />
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirmar senha..."
                  v-bind="componentField"
                  autocomplete="current-password"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField, value }" name="birthday">
            <FormItem class="flex flex-col">
              <Popover>
                <PopoverTrigger as-child>
                  <FormControl>
                    <Button variant="outline" :class="cn(!value && 'text-muted-foreground')">
                      <span>{{ value ? formatDateInFull(value) : 'Data de aniversário...' }}</span>
                      <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent class="p-0">
                  <Calendar v-bind="componentField" />
                </PopoverContent>
              </Popover>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit" class="w-full">Registrar-se</Button>
        </form>
      </main>
    </template>
  </BaseAuth>
</template>
