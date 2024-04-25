<script setup lang="ts">
// Utils
import { vacancyLabelState } from '@/utils/labels'

// Zod
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// Shadcn-vue components
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'



import { StateVacancyValues, type StateVacancy } from '@/entites/IVacancy'
import type { ICreateVacancy } from '@/apis/project/types/ICreateVacancy'

export interface IProjectFormProps {
  title?: string
  description?: string
  state?: StateVacancy

  handleSubmit: (values: ICreateVacancy) => Promise<void>
}

const props = withDefaults(defineProps<IProjectFormProps>(), {})

const formSchema = toTypedSchema(
  z.object({
    title: z
      .string({
        required_error: 'Campo título obrigatório'
      })
      .min(3, { message: 'O título deve ter no mínimo 3 caracteres' }),
    description: z
      .string({
        required_error: 'Campo descrição obrigatório'
      })
      .min(10, { message: 'A descrição deve ter no mínimo 10 caracteres.' }),
    state: z.enum(StateVacancyValues, {
      required_error: 'Campo status obrigatório'
    })
  })
)

const form = useForm({
  validationSchema: formSchema
})

form.setValues({
  title: props.title,
  description: props.description,
  state: props.state
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
            placeholder="Ex.: Desenvolvedor Java com Spring"
            v-bind="componentField"
            autocomplete="title"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Descrição</FormLabel>
        <FormLabel />
        <FormControl>
          <Textarea
            placeholder="Ex.: Desenvolver tarefas utilizando microsserviços."
            v-bind="componentField"
            class="resize-none"
            autocomplete="description"
          />
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
              <SelectValue placeholder="Selecione o status da vaga" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="item in Object.entries(vacancyLabelState)" :value="item[0]">
                {{ item[1] }}
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
