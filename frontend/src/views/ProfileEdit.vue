<script setup lang="ts">
import AvatarDefault from '@/assets/user-icon.jpg'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

import { ImageIcon } from 'lucide-vue-next'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import BaseAuth from '@/components/BaseAuth.vue'

import { useAuthStore } from '@/stores/auth'
import { userService } from '@/services'
import type { IUserData } from '@/entites/IUser'
import { useToast } from '@/components/ui/toast/use-toast'

const { user } = useAuthStore()

const formSchema = toTypedSchema(
  z.object({
    name: z.string().optional(),
    aboutDescription: z.string().optional(),
    birthday: z.date().max(new Date(), { message: 'Data inválida.' }).optional(),
    avatarUrl: z.string().url({ message: 'Esse não é um link válido.' }).optional(),
    phone: z
      .string()
      .regex(/^\d{2}\d{5}\d{4}$/, 'Esse não é um telefone válido.')
      .optional(),
    bio: z.string().optional()
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: ''
  }
})

const { toast } = useToast()

const onSubmit = form.handleSubmit(async (values) => {
  const valuesToSubmit: IUserData = {
    ...values,
    email: user.email as string
  }

  try {
    const userState = await userService.updateUser(user.id as number, valuesToSubmit)
    toast({
      title: 'Modificações salvas',
      variant: 'default'
    })
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
  <main class="pt-5 relative flex flex-col justify-center items-center flex-1 p-5">
    <form @submit="onSubmit" class="space-y-8 w-full max-w-[450px]">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Nome</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Nome do seu usuário" v-bind="componentField" />
          </FormControl>
          <FormDescription> Nome visisel para os outros </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="aboutDescription">
        <FormItem>
          <FormLabel>About</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Breve descrição sobre você" v-bind="componentField" />
          </FormControl>
          <FormDescription> Breve descrição sobre você </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="avatarUrl">
        <FormItem>
          <FormLabel>Avatar</FormLabel>
          <FormControl>
            <div class="relative w-full max-w-sm items-center">
              <Input
                type="text"
                id=""
                placeholder="URL da image..."
                class="pl-10"
                v-bind="componentField"
              />
              <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                <ImageIcon class="size-6 text-muted-foreground" />
              </span>
            </div>
            <Avatar class="size-20">
              <AvatarImage :src="componentField.modelValue ?? ''" />

              <AvatarFallback>
                <img :src="AvatarDefault" alt="user-avatar-default" />
              </AvatarFallback>
            </Avatar>
          </FormControl>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="bio">
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea placeholder="Tell us a little bit about yourself" v-bind="componentField" />
          </FormControl>
          <FormDescription> Describe about you </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField, value }" name="birthday">
        <FormItem class="flex flex-col">
          <FormLabel>Date of birth</FormLabel>
          <Popover>
            <PopoverTrigger as-child>
              <FormControl>
                <Button
                  variant="outline"
                  :class="
                    cn('w-[280px] pl-3 text-left font-normal', !value && 'text-muted-foreground')
                  "
                >
                  <span>{{ value ? format(value, 'PPP') : 'Pick a date' }}</span>
                  <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent class="p-0">
              <Calendar v-bind="componentField" />
            </PopoverContent>
          </Popover>
          <FormDescription> Your date of birth is used to calculate your age. </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="phone">
        <FormItem>
          <FormLabel>Telefone</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Nome do seu usuário" v-bind="componentField" />
          </FormControl>
          <FormDescription> Seu numero de telefone (no formato 84987878787) </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit"> Submit </Button>
    </form>
  </main>
</template>
