<script setup lang="ts">
// Images
import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg'

// Form Validation
import { useFieldArray, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

// Icons
import { Calendar as CalendarIcon, ImageIcon, X } from 'lucide-vue-next'

// App components
import MethodologieField from '@/components/MethodologieField.vue'

// Shadcn-vue componentns
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/components/ui/toast/use-toast'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

// Store pinia
import { useUserStore } from '@/stores/user'

// Types
import type { IUserEntity, IInputUserData } from '@/entites/IUser'
import type { IOutputMethodologieEntity } from '@/entites/IMethodologie'

// Services
import { methodologiesService } from '@/services'

// Vue imports
import { onBeforeMount, ref } from 'vue'

interface IProfileEditProps {
  user: IUserEntity
}

const userStore = useUserStore()

const props = defineProps<IProfileEditProps>()

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
    aboutDescription: z.string().nullish(),
    birthday: z.date().max(new Date(), { message: 'Data inválida.' }),
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
      .nullish(),
    bio: z.string().nullish(),
    methodologies: z
      .array(
        z
          .string({ required_error: 'Campo metodologia obrigatório' })
          .min(1, { message: 'Campo metodologia obrigatório' })
      )
      .refine((items) => new Set(items).size === items.length, {
        message: 'As metodologias devem ser únicas.'
      })
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
  bio: props.user.bio,
  methodologies: props.user?.methodologies
    ? [...props.user.methodologies.map((met) => met.id.toString())]
    : []
})

const onSubmit = form.handleSubmit(async (values) => {
  const valuesToSubmit: IInputUserData = {
    ...values,
    email: props.user.email,
    birthday: values.birthday.toISOString(),
    methodologies: values.methodologies.map((met) => ({ id: parseInt(met) }))
  }

  try {
    await userStore.update(props.user.id, valuesToSubmit)

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

const { remove, push, fields, update } = useFieldArray('methodologies')

const methodologies = ref<IOutputMethodologieEntity[]>([])

async function fetchMethodologies() {
  const res = await methodologiesService.findAll()

  methodologies.value = res
}
onBeforeMount(async () => {
  await fetchMethodologies()
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
                <img :src="DefaultUserIcon" alt="user-avatar-default" />
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

      <Button @click="() => push('')" type="button" class="self-start" variant="secondary">
        <Plus />
        Adicione Metodologias
      </Button>

      <FormField
        v-for="(field, index) in fields"
        v-slot="{ componentField }"
        :name="'methodologies.' + index"
      >
        <FormItem>
          <FormLabel>Metodologia {{ index + 1 }}</FormLabel>
          <FormControl>
            <div class="flex space-x-2">
              <Button @click="() => remove(index)" type="button" variant="ghost" size="icon">
                <X :size="20" />
              </Button>

              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a metodologia" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="met in methodologies" :value="met.id.toString()">
                      {{ met.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <!-- <MethodologieField
                :methodologies="methodologies"
                @update="(value) => update(index, value)"
              /> -->
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <p className="text-destructive text-sm">
        {{ form.errors.value.methodologies }}
      </p>

      <Button type="submit" class="w-full">Salvar mudanças</Button>
    </form>
  </main>
</template>
