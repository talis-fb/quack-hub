<script setup lang="ts">
// Zod
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// App components
import LoadingSpinner from '@/components/LoadingSpinner.vue'

// Shadcn-vue components
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'

// Vue imports
import { ref } from 'vue'

// Repositories
import { githubRepository } from '@/repositories'

// Types
import type { IProjectGithub } from '@/repositories/github/github.repository'

export interface IGithubProjectImportEmit {
  (e: 'imported', data: IProjectGithub): void
}

const emit = defineEmits<IGithubProjectImportEmit>()

const { toast } = useToast()

const formSchema = toTypedSchema(
  z.object({
    username: z.string({
      required_error: 'Campo nome do usuário obrigatório'
    }),
    repositoryName: z.string({
      required_error: 'Campo nome do repositório obrigatório'
    })
  })
)

const form = useForm({
  validationSchema: formSchema
})

const loading = ref(false)

const onSubmit = form.handleSubmit(async (values) => {
  loading.value = true

  try {
    const { username, repositoryName } = values

    const res = await githubRepository.getProject(username, repositoryName)

    emit('imported', res)

    toast({
      title: 'Repositório Github',
      description: 'Repositório do Github importado com sucesso. Volte ao formulário!',
      variant: 'default'
    })
  } catch (error) {
    toast({
      title: 'Erro ao importar projeto do Github',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  } finally {
    loading.value = false
  }
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

      <Button v-if="!loading" type="submit"> Importar </Button>
      <Button v-else disabled>
        <LoadingSpinner class="mr-1"/>
        Importando...
      </Button>
    </form>
  </div>
</template>
<style lang=""></style>
