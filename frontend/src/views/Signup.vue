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
import { Calendar as CalendarIcon } from 'lucide-vue-next'

// Components
import Auth from '@/components/Auth.vue'

// router
import router from '../router/index'

// date-fns
import { formatDateInFull } from '@/utils/DateFormat'

const formSchema = toTypedSchema(
  z
    .object({
      email: z
        .string()
        .min(1, { message: 'Esse campo deve ser preenchido.' })
        .email('Esse não é um e-mail válido.'),
      password: z.string().min(5, { message: 'Senha deve ter no mínimo 5 caracteres.' }),
      confirmPassword: z.string(),
      birthday: z.date()
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Senhas não correspondem',
      path: ['confirmPassword']
    })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
  } catch (error) {}
})
</script>

<template>
  <Auth>
    <template v-slot:main>
      <div class="text-center mb-5">
        <h1 class="text-2xl font-semibold">Registro</h1>
        <p class="text-sm text-muted-foreground">
          Registre-se no sistema para poder desfrutar das funcionalidades.
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
                placeholder="Password..."
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
                placeholder="Confirm password..."
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
                    <span>{{ value ? formatDateInFull(value) : 'Pick a date' }}</span>
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
    </template>
  </Auth>
</template>
