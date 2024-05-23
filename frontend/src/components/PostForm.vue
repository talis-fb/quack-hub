<script setup lang="ts">
// Zod
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

//Icons
import { ImageIcon } from 'lucide-vue-next'

// Shadcn-vue components
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { IPostData } from '@/entites/IPost'

export interface IPostFormProps {
  title?: string
  content?: string
  imageUrl?: string | null
}

export interface IPostFormEmit {
  (e: 'submited', data: IPostData): void
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
      .min(2, { message: 'O título deve ter no mínimo 2 caracteres' }),
    imageUrl: z
      .string({
        required_error: 'Campo url da imagem obrigatório.'
      })
      .url({ message: 'Esse não é um link válido.' })
      .nullish()
      .or(z.literal(''))
      .transform((e) => (e === '' ? null : e))
  })
)

const form = useForm({
  validationSchema: formSchema
})

form.setValues({
  title: props.title,
  content: props.content,
  imageUrl: props.imageUrl
})

const onSubmit = form.handleSubmit((values) => {
  emit('submited', { ...values, imageUrl: values.imageUrl ?? null })
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

    <FormField v-slot="{ componentField }" name="imageUrl">
      <FormItem>
        <FormLabel>Imagem</FormLabel>
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
          <img class="w-full" :src="componentField.modelValue ?? ''" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" class="w-full">Salvar</Button>
  </form>
</template>

<style scoped></style>
