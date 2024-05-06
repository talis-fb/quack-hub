<script setup lang="ts">
// Zod
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// Shadcn-vue components
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export interface IPostFormData {
  title: string
  content: string
}

export interface IPostFormProps {
  title?: string
  content?: string
}

export interface IPostFormEmit {
  (e: 'create', data: IPostFormData): void
}

const emit = defineEmits<IPostFormEmit>()

const props = withDefaults(defineProps<IPostFormProps>(), {})

const formSchema = toTypedSchema(
  z.object({
    title: z
      .string({
        required_error: 'Campo título obrigatório'
      })
      .min(3, { message: 'O título deve ter no mínimo 3 caracteres' }),
    content: z
      .string({
        required_error: 'O conteúdo da postagem é obrigatório'
      })
      .min(2, { message: 'O título deve ter no mínimo 2 caracteres' })
  })
)

const form = useForm({
  validationSchema: formSchema
})

form.setValues({
  title: props.title,
  content: props.content
})

const onSubmit = form.handleSubmit((values) => {
  emit('create', values)
  form.resetForm()
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
            placeholder="Título da postagem"
            v-bind="componentField"
            autocomplete="title"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="content">
      <FormItem>
        <FormLabel>Conteúdo</FormLabel>

        <FormControl>
          <Textarea
            placeholder="O que está acontecendo?"
            v-bind="componentField"
            class="resize-none"
            autocomplete="content"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" class="w-full">Salvar</Button>
  </form>
</template>

<style scoped></style>
