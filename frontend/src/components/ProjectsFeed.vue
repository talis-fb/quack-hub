<script setup lang="ts">
// Shadcn-vue components
import type { IProjectEntity } from '@/entites/IProject'
import { Button } from './ui/button'

import { projectService } from '@/services'
import { onMounted, ref } from 'vue'
import Separator from './ui/separator/Separator.vue'

const projects = ref<IProjectEntity[]>([])

onMounted(async () => {
  const res = await projectService.search()

  projects.value = res
})
</script>

<template>
  <div class="w-full p-5">
    <Button type="button" variant="default"> Adicionar projeto </Button>

    <div class="mt-6 flex flex-col space-y-4">
      <div v-for="project in projects">
        <Separator class="h-[1px] bg-white mb-2" />

        <p>Título: {{ project.title }}</p>
        <p>Estado do projeto: {{ project.state }}</p>

        <p>Setor: {{ project.sector }}</p>

        <p>Resumo: {{ project.summary }}</p>
        <p>Metodologias: {{ project.methodologies }}</p>

        <p>Vagas: {{ project.vacancies }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
