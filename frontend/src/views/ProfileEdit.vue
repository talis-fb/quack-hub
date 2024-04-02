<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import BaseAuth from '@/components/BaseAuth.vue'

import { useAuthStore } from '@/stores/auth'
import { userService } from '@/services'
import type { IUserData } from '@/entites/IUser'
import { useToast } from '@/components/ui/toast/use-toast'

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(1, { message: 'Esse campo deve ser preenchido.' })
      .email('Esse não é um e-mail válido.'),
    aboutDescription: z.string(),
    birthday: z.date().max(new Date(), { message: 'Data inválida.' }),
    avatarUrl: z
      .string()
      .url({ message: 'Esse não é um link válido.' }),
    phone: z.string().regex(/^\d{2}\d{5}\d{4}$/, 'Esse não é um telefone válido.'),
    bio: z.string()
  })
)

const form = useForm({
  validationSchema: formSchema
})

const { toast, dismiss } = useToast()

const { user } = useAuthStore()


const onSubmit = form.handleSubmit(async (values) => {
  const valuesToSubmit: IUserData = {
    ...values,
    email: user.email as string,
  }

  try {
    const userState = await userService.updateUser(user.id as number, valuesToSubmit)
    alert('deu certo!')
  } catch (error) {
    toast({
      title: 'Erro ao efetuar login.',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
})
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">
      Profile
    </h3>
    <p class="text-sm text-muted-foreground">
      This is how others will see you on the site.
    </p>
  </div>

  <Separator />

  <form @submit="onSubmit" class="space-y-8">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Nome</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Nome do seu usuário" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          Nome visisel para os outros
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="bio">
      <FormItem>
        <FormLabel>Bio</FormLabel>
        <FormControl>
          <Textarea placeholder="Tell us a little bit about yourself" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          Describe about you
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, value }" name="dob">
      <FormItem class="flex flex-col">
        <FormLabel>Date of birth</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline" :class="cn(
                  'w-[280px] pl-3 text-left font-normal',
                  !value && 'text-muted-foreground',
                )"
              >
                <span>{{ value ? format(value, "PPP") : "Pick a date" }}</span>
                <RadixIconsCalendar class="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="p-0">
            <Calendar v-bind="componentField" />
          </PopoverContent>
        </Popover>
        <FormDescription>
          Your date of birth is used to calculate your age.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>


    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
