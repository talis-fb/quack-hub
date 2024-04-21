<script setup lang="ts">
// Images
import AvatarDefault from '@/assets/user-icon.jpg'

// Form Validation
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

// Icons
import { Calendar as CalendarIcon, ImageIcon } from 'lucide-vue-next'

// Shadcn-vue componentns
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/components/ui/toast/use-toast'

// Store pinia
import { useAuthStore } from '@/stores/auth'

// Services
import { userService } from '@/services'

// Types
import type { IUserData, IUserEntity } from '@/entites/IUser'

interface IProfileEditProps {
  user: IUserEntity
}

const props = defineProps<IProfileEditProps>()

const { user } = useAuthStore()

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
    aboutDescription: z.string().optional(),
    birthday: z.date().max(new Date(), { message: 'Data inválida.' }).optional(),
    avatarUrl: z
      .string({
        required_error: 'Campo avatarUrl obrigatório.'
      })
      .url({ message: 'Esse não é um link válido.' })
      .nullish()
      .or(z.literal(''))
      .transform((e) => (e === '' ? null : e)),
    phone: z
      .string()
      .regex(/^\d{2}\d{5}\d{4}$/, 'Esse não é um telefone válido.')
      .optional(),
    bio: z.string().optional()
  })
)

const { toast } = useToast()

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: ''
  }
})

form.setValues({
  name: props.user.name,
  aboutDescription: props.user.aboutDescription,
  birthday: props.user.birthday ? new Date(props.user.birthday) : undefined,
  avatarUrl: props.user.avatarUrl,
  phone: props.user.phone,
  bio: props.user.bio
})

const onSubmit = form.handleSubmit(async (values) => {
  console.log({ values })
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
      title: 'Erro ao atualizar o perfil do usuário.',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
})
</script>

<template>
  <main class="flex flex-col justify-center items-center flex-1">
    <form @submit="onSubmit" class="space-y-2 w-full">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Nome</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Nome do seu usuário" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="aboutDescription">
        <FormItem>
          <FormLabel>Sobre</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Breve descrição sobre você" v-bind="componentField" />
          </FormControl>
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
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="bio">
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea placeholder="Conte-nos um pouco sobre você" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField, value }" name="birthday">
        <FormItem class="flex flex-col">
          <FormLabel>Data de aniversário</FormLabel>
          <Popover>
            <PopoverTrigger as-child>
              <FormControl>
                <Button
                  variant="outline"
                  :class="
                    cn('w-[280px] pl-3 text-left font-normal', !value && 'text-muted-foreground')
                  "
                >
                  <span>{{ value ? format(value, 'PPP') : 'Escolha uma data' }}</span>
                  <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent class="p-0">
              <Calendar v-bind="componentField" />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="phone">
        <FormItem>
          <FormLabel>Telefone</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Ex.: 84987878787" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" class="w-full">Salvar mudanças</Button>
    </form>
  </main>
</template>
