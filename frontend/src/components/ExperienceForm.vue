<script setup lang="ts">
// Types
import { type ExperienceType, type IExperienceEntity } from '@/entites/IExperience'

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
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

// Icons
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import type { ICreateExperience } from '@/apis/experience/types/ICreateExperience'
import { projectService } from '@/services'
import { onMounted, ref } from 'vue'
import type { IProjectEntity } from '@/entites/IProject'

// Lifecycle Hooks

export interface IExperienceFormProps {
  experience?: IExperienceEntity

  titleLabel?: string
  titlePlaceholder?: string
  type: ExperienceType
  handleSubmit: (values: ICreateExperience) => Promise<void>
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
      .min(3, { message: 'O título deve ter no mínimo 3 caracteres.' }),
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
      .max(new Date(), { message: 'Data inválida.' }),
    projectId: z
      .string()
      .nullish()
      .or(z.literal(''))
      .transform((e) => (e === '' ? null : e))
  })
)

const form = useForm({
  validationSchema: formSchema
})

form.setValues({
  title: props.experience?.title,
  about: props.experience?.about,
  startDate: props.experience?.startDate ? new Date(props.experience?.startDate) : undefined,
  endDate: props.experience?.endDate ? new Date(props.experience?.endDate) : undefined,
  projectId: props.experience?.projectId ? props.experience?.projectId.toString() : undefined
})

const onSubmit = form.handleSubmit(async (values) => {
  // TODO: Tirar esse valor 'mockado' de  achievements.
  await props.handleSubmit({
    ...values,
    projectId: values.projectId ? +values.projectId : null,
    achievements: [],
    type: props.type
  })
  form.resetForm()
})

const projects = ref<IProjectEntity[]>([])

onMounted(async () => {
  projects.value = await projectService.search()
})
</script>

<template>
  <form @submit="onSubmit" class="w-full flex flex-col gap-4">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>{{ props.titleLabel }}</FormLabel>
        <FormControl>
          <Input
            type="text"
            :placeholder="props.titlePlaceholder"
            v-bind="componentField"
            autocomplete="title"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="about">
      <FormItem>
        <FormLabel>Descrição</FormLabel>

        <FormControl>
          <Textarea
            placeholder="Fale um pouco sobre sua experiência"
            v-bind="componentField"
            class="resize-none"
            autocomplete="about"
          />
        </FormControl>
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

    <FormField v-slot="{ componentField }" name="projectId">
      <FormItem>
        <FormLabel>Projeto</FormLabel>

        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o projeto" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="''"> Nenhum </SelectItem>
              <SelectItem v-for="project in projects" :value="project.id.toString()">
                {{ project.title }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" class="w-full">Salvar</Button>
  </form>
</template>

<style scoped></style>
