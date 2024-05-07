<script setup lang="ts">
// Zod
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { type ICommentEntity } from '../entites/IComment'

// Shadcn-vue components
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export interface ICommentFormProps {
  comment: ICommentEntity
}

export interface ICommentFormEmit {
  (e: 'update', content: string): void
}

const emit = defineEmits<ICommentFormEmit>()

const props = defineProps<ICommentFormProps>()

const formSchema = toTypedSchema(
  z.object({
    content: z
      .string({
        required_error: 'Campo conteúdo da messagem é obrigatório'
      })
      .min(1, { message: 'O conteúdo da messagem deve ter no mínimo 1 caracteres.' })
  })
)

const form = useForm({
  validationSchema: formSchema
})

form.setValues({
  content: props.comment.content
})

const onSubmit = form.handleSubmit((values) => {
  emit('update', values.content)
})
</script>

<template>
  <form @submit="onSubmit" class="w-full flex flex-col gap-4">
    <FormField v-slot="{ componentField }" name="content">
      <FormItem>
        <FormLabel>Conteúdo da mensagem</FormLabel>
        <FormControl>
          <Textarea
            class="resize-none"
            placeholder="Conteúdo..."
            v-bind="componentField"
            autocomplete="content"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button :disabled="!form.meta.value.valid" type="submit" class="w-full">Salvar</Button>
  </form>
</template>

<style scoped></style>
