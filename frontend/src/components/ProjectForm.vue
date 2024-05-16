<script setup lang="ts">
// Images
import DefaultProjectIcon from '@/assets/DefaultProjectIcon.jpg'

// Utils
import { projectStateLabel } from '@/utils/labels'

// Zod
import { useFieldArray, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// date-fns
import { cn } from '@/lib/utils'
import { formatDateInFull } from '@/utils/DateFormat'

// Shadcn-vue components
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
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
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// App components
import AppDialog from '@/components/AppDialog.vue'
import GithubProjectImport from '@/components/GithubProjectImport.vue'

// Icons
import { Calendar as CalendarIcon, ImageIcon, Github, Linkedin, Plus, X } from 'lucide-vue-next'
import { type IProjectData, type IProjectEntity, StateProjectValues } from '../entites/IProject'
import type { IProjectGithub } from '@/repositories/github/github.repository'

export interface IProjectFormProps {
  project?: IProjectEntity
  clearFormAfterSubmit?: boolean
  handleSubmit: (values: IProjectData) => Promise<void>
}

const props = withDefaults(defineProps<IProjectFormProps>(), {
  clearFormAfterSubmit: true
})

const schema = z
  .object({
    title: z
      .string({
        required_error: 'Campo título obrigatório'
      })
      .min(3, { message: 'O título deve ter no mínimo 3 caracteres' }),
    summary: z
      .string({
        required_error: 'Campo resumo obrigatório'
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
      .nullable(),
    logoUrl: z
      .string({
        required_error: 'Campo logo url obrigatório.'
      })
      .url({ message: 'Esse não é um link válido.' })
      .nullable()
      .or(z.literal(''))
      .transform((e) => (e === '' ? null : e)),
    methodologies: z.array(
      z.string().min(2, {
        message: 'A metodologia deve ter no mínimo 2 caracteres.'
      })
    )
    // .optional()
  })
  .transform((data) => {
    if (data.state === 'PROGRESS') {
      return {
        ...data,
        endDate: null
      }
    }

    return data
  })
  .superRefine((data, ctx) => {
    if (data.state !== 'PROGRESS') {
      if (data.endDate === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Campo fim obrigatório',
          path: ['endDate']
        })
      }
    }
  })

const formSchema = toTypedSchema(schema)

const form = useForm({
  validationSchema: formSchema
})

/*
  Sobre o código
    methodologies: props.project?.methodologies ? [...props.project .methodologies] : []
  é necessário colocar [...props.project .methodologies] para que não cause bug ao
  não fazer nenhuma ação no formulário como editar ou remover metodologias.
  O bug deixa o project passado pelo ProjectView com array de metodologias vázios.

  EU NÃO FAÇO IDEIA O PORQUÊ!
*/

form.setValues({
  title: props.project?.title,
  summary: props.project?.summary,
  about: props.project?.about,
  sector: props.project?.sector,
  state: props.project?.state,
  startDate: props.project?.startDate,
  endDate: props.project?.endDate ?? null,
  logoUrl: props.project?.logoUrl ?? null,
  methodologies: props.project?.methodologies ? [...props.project.methodologies] : []
})

const onSubmit = form.handleSubmit(async (values) => {
  await props.handleSubmit({ ...values })

  if (props.clearFormAfterSubmit) {
    form.resetForm()
    replace([])
  }
})

const handleProjectImported = (data: IProjectGithub) => {
  form.setValues({
    title: data.name ?? '',
    about: data.description ?? '',
    startDate: new Date(data.created_at),
    methodologies: data.methodologies ?? []
  })
}

const { remove, push, fields, replace } = useFieldArray('methodologies')
</script>

<template>
  <div class="p-3 max-h-[100%] overflow-auto">
    <p>Importar de:</p>
    <div class="flex justify-center space-x-2">
      <AppDialog>
        <template #trigger>
          <Button variant="outline" size="icon" class="rounded-full">
            <Github />
          </Button>
        </template>
        <template #title> Importar projeto pelo Github </template>
        <template #description> Importe seu projeto pelo GitHub e economize seu tempo! </template>
        <template #main>
          <GithubProjectImport @imported="handleProjectImported" />
        </template>
      </AppDialog>

      <Button variant="outline" size="icon" class="rounded-full">
        <Linkedin />
      </Button>
    </div>

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
        <FormItem v-if="form.values.state != 'PROGRESS'" class="flex flex-col">
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

      <FormField v-slot="{ componentField }" name="logoUrl">
        <FormItem>
          <FormLabel>Logo</FormLabel>
          <FormControl>
            <div class="relative w-full max-w-sm items-center">
              <Input
                type="text"
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
                <img :src="DefaultProjectIcon" alt="project-logo" />
              </AvatarFallback>
            </Avatar>
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
              <Input
                type="text"
                placeholder="Ex.: Typescript"
                v-bind="componentField"
                autocomplete="methodologies"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" class="w-full">Salvar</Button>
    </form>
  </div>
</template>

<style scoped></style>
