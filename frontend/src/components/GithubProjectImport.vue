<script setup lang="ts">
// Zod
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// Shadcn-vue components
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { githubApi } from '@/apis'

const formSchema = toTypedSchema(
  z.object({
    username: z.string({
      required_error: 'Campo username obrigatório'
    }),
    repositoryName: z.string({
      required_error: 'Campo nome do projeto obrigatório'
    })
  })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit(async (values) => {
  const { username, repositoryName } = values

  const res = await githubApi.getProject(username, repositoryName)
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <form @submit="onSubmit" class="w-full flex flex-col gap-4">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Nome do usuário</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Ex.: talis-fb"
              v-bind="componentField"
              autocomplete="username"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="repositoryName">
        <FormItem>
          <FormLabel>Nome do repositório</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Ex.: quack-hub"
              v-bind="componentField"
              autocomplete="repositoryName"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit">Importar</Button>
    </form>
  </div>
</template>
<style lang=""></style>
