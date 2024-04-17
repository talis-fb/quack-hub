<script setup lang="ts">
// Types
import { type ExperienceType } from '@/entites/IExperience'

// Zod
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// date-fns
import { cn } from '@/lib/utils'
import { formatDateInFull } from '@/utils/DateFormat'

// Shadcn-vue components
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Calendar } from '@/components/ui/calendar'

import { Button } from '@/components/ui/button'

// Icons
import { Calendar as CalendarIcon } from 'lucide-vue-next'

// Lifecycle Hooks

export interface ExperienceDataForm {
  title: string
  about: string
  startDate: Date
  endDate: Date
  type: ExperienceType
  projectId: number | null
  achievements: []
}

export interface IExperienceFormProps {
  title?: string
  about?: string
  startDate?: Date
  endDate?: Date

  titleLabel?: string
  titlePlaceholder?: string
  type: ExperienceType
  handleSubmit: (values: ExperienceDataForm) => Promise<void>
}

const props = withDefaults(defineProps<IExperienceFormProps>(), {
  titleLabel: 'Título',
  titlePlaceholder: 'Título...'
})

const formSchema = toTypedSchema(
  z.object({
    title: z
      .string({
        required_error: 'Campo título obrigatório'
      })
      .min(1, { message: 'Esse campo deve ser preenchido.' }),
    about: z
      .string({
        required_error: 'Campo descrição obrigatório'
      })
      .min(10, { message: 'A descrição deve ter no mínimo 10 caracteres.' }),
    startDate: z
      .date({
        required_error: 'Campo início obrigatório'
      })
      .max(new Date(), { message: 'Data inválida.' }),
    endDate: z
      .date({
        required_error: 'Campo fim obrigatório'
      })
      .max(new Date(), { message: 'Data inválida.' })
    // projectId: z.number()
  })
)

// const { toast, dismiss } = useToast()

const form = useForm({
  validationSchema: formSchema
})

form.setValues({
  title: props.title,
  about: props.about,
  startDate: props.startDate,
  endDate: props.endDate
})

const onSubmit = form.handleSubmit(async (values) => {
  await props.handleSubmit({ ...values, projectId: null, achievements: [], type: props.type })
})

// const onSubmit = form.handleSubmit(async (values) => {
//   try {
//     const res = await experienceService.create({
//       ...values,
//       type: props.type,
//       projectId: null,
//       achievements: []
//     })

//     toast({
//       title: 'Experiência',
//       description: 'Experiência cadastrada com sucesso!',
//       variant: 'default'
//     })
//   } catch (error: any) {
//     toast({
//       title: 'Erro ao criar a experiência',
//       description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
//       variant: 'destructive'
//     })
//   }
// })

// onUnmounted(() => {
//   dismiss()
// })
</script>

<template>
  <form @submit="onSubmit" class="w-full flex flex-col gap-4">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>{{ props.titleLabel }}</FormLabel>

        <FormLabel />
        <FormControl>
          <Input
            type="text"
            :placeholder="props.titlePlaceholder"
            v-bind="componentField"
            autocomplete="title"
          />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="about">
      <FormItem>
        <FormLabel>Descrição</FormLabel>

        <FormLabel />
        <FormControl>
          <Textarea
            placeholder="Fale um pouco sobre sua experiência"
            v-bind="componentField"
            class="resize-none"
            autocomplete="about"
          />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, value }" name="startDate">
      <FormItem class="flex flex-col">
        <FormLabel>Início</FormLabel>

        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button variant="outline" :class="cn(!value && 'text-muted-foreground')">
                <span>{{ value ? formatDateInFull(value) : 'Início' }}</span>
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

    <FormField v-slot="{ componentField, value }" name="endDate">
      <FormItem class="flex flex-col">
        <FormLabel>Fim</FormLabel>

        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button variant="outline" :class="cn(!value && 'text-muted-foreground')">
                <span>{{ value ? formatDateInFull(value) : 'Fim' }}</span>
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

    <Button type="submit" class="w-full">Salvar</Button>
  </form>
</template>

<style scoped></style>
