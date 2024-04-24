<script setup lang="ts">
// App components
import ProjectsList from '@/components/ProjectsList.vue'
import ProjectsListFallback from '@/components/ProjectsListFallback.vue'
import ProjectForm from '@/components/ProjectForm.vue'
import AppDialog from '@/components/AppDialog.vue'

// Shadcn-vue components
import { Button } from './ui/button'
import { provide, Suspense } from 'vue'
import { useToast } from './ui/toast'

// Store pinia
import { useProjectStore } from '@/stores/project'
import type { ICreateProject } from '@/apis/project/types/ICreateProject'
import { storeToRefs } from 'pinia'

const projectStore = useProjectStore()

const { projects } = storeToRefs(projectStore)

const { toast } = useToast()

const handleSubmit = async (values: ICreateProject) => {
  try {
    await projectStore.createProject(values)

    toast({
      title: ``,
      description: 'Projeto cadastrado com sucesso!',
      variant: 'default',
      duration: 1000
    })
  } catch (error: any) {
    toast({
      title: 'Erro ao criar projeto',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
}

provide('hasPermissions', false)
</script>

<template>
  <div class="w-full p-5">
    <AppDialog>
      <template #trigger>
        <Button variant="default">Adicionar projeto </Button>
      </template>
      <template #title> Adicionar projeto </template>
      <template #description>
        Adicione seus projetos para serem vistos por outros usuários e vincule-os às experiências
        acadêmicas ou profissionais.
      </template>
      <template #main>
        <ProjectForm :handle-submit="handleSubmit" />
      </template>
    </AppDialog>

    <div class="mt-6 flex flex-col space-y-5">
      <Suspense>
        <ProjectsList
          :projects="projects"
          :get-projects="async () => await projectStore.getProjects()"
        />
        <template #fallback>
          <ProjectsListFallback :length="5" />
        </template>
      </Suspense>
    </div>
  </div>
</template>
<style scoped></style>
