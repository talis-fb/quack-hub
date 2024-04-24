<script setup lang="ts">
// Utils
import { projectStateLabel } from '@/utils/labels'

// Types

// Zod
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// date-fns
import { cn } from '@/lib/utils'
import { formatDateInFull } from '@/utils/DateFormat'

// Shadcn-vue components
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { Calendar } from '@/components/ui/calendar'

import { Button } from '@/components/ui/button'

// Icons
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { type StateProject, StateProjectValues } from '../entites/IProject'
import type { ICreateProject } from '@/apis/project/types/ICreateProject'

// Lifecycle Hooks

// export interface ProjectDataForm {
//   title: string
//   summary: string
//   about: string
//   sector: string
//   state: StateProject
//   startDate: Date
//   endDate: Date
// }

export interface IProjectFormProps {
  title?: string
  summary?: string
  about?: string
  sector?: string
  state?: StateProject
  startDate?: string
  endDate?: string

  handleSubmit: (values: ICreateProject) => Promise<void>
}

const props = withDefaults(defineProps<IProjectFormProps>(), {})

const formSchema = toTypedSchema(
  z.object({
    title: z
      .string({
        required_error: 'Campo título obrigatório'
      })
      .min(3, { message: 'O título deve ter no mínimo 3 caracteres' }),
    summary: z
      .string({
        required_error: 'Campo descrição resumo'
      })
      .min(5, { message: 'O resumo deve ter no mínimo 5 caracteres.' }),
    about: z
      .string({
        required_error: 'Campo descrição obrigatório'
      })
      .min(10, { message: 'A descrição deve ter no mínimo 10 caracteres.' }),
    sector: z
      .string({
        required_error: 'Campo setor obrigatório'
      })
      .min(2, { message: 'O setor deve ter no mínimo 2 caracteres.' }),
    state: z.enum(StateProjectValues, {
      required_error: 'Campo status obrigatório'
    }),
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

const form = useForm({
  validationSchema: formSchema
})

form.setValues({
  title: props.title,
  about: props.about,
  startDate: props.startDate ? new Date(props.startDate) : undefined,
  endDate: props.endDate ? new Date(props.endDate) : undefined
})

const onSubmit = form.handleSubmit(async (values) => {
  await props.handleSubmit({ ...values })
})
</script>

<template>
  <form @submit="onSubmit" class="w-full flex flex-col gap-4">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Título</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Ex.: Duckchat"
            v-bind="componentField"
            autocomplete="title"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="summary">
      <FormItem>
        <FormLabel>Resumo</FormLabel>

        <FormControl>
          <Input
            placeholder="Ex.: Cópia do discord"
            v-bind="componentField"
            autocomplete="summary"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="about">
      <FormItem>
        <FormLabel>Sobre</FormLabel>

        <FormLabel />
        <FormControl>
          <Textarea
            placeholder="Ex.: Projeto baseado nas funcionalidades básicas de chat em tempo real."
            v-bind="componentField"
            class="resize-none"
            autocomplete="about"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="sector">
      <FormItem>
        <FormLabel>Setor</FormLabel>

        <FormLabel />
        <FormControl>
          <Input placeholder="Ex.: Software" v-bind="componentField" autocomplete="sector" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="state">
      <FormItem>
        <FormLabel>Status</FormLabel>

        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status do projeto" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="item in Object.entries(projectStateLabel)" :value="item[0]">
                {{ item[1] }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
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
            <FormMessage />
          </PopoverTrigger>
          <PopoverContent class="p-0">
            <Calendar v-bind="componentField" />
          </PopoverContent>
        </Popover>
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
            <FormMessage />
          </PopoverTrigger>
          <PopoverContent class="p-0">
            <Calendar v-bind="componentField" />
          </PopoverContent>
        </Popover>
      </FormItem>
    </FormField>

    <Button type="submit" class="w-full">Salvar</Button>
  </form>
</template>

<style scoped></style>
