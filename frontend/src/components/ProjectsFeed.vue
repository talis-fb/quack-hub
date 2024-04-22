<script setup lang="ts">
import type { IProjectEntity, StateProject } from '@/entites/IProject'

// Shadcn-vue components
import { Button } from './ui/button'
import { Badge } from '@/components/ui/badge'

import { projectService } from '@/services'
import { onMounted, ref } from 'vue'
import Separator from './ui/separator/Separator.vue'

const projects = ref<IProjectEntity[]>([])

onMounted(async () => {
  const res = await projectService.search()

  projects.value = res
})

const badgeColors: Record<StateProject, String> = {
  IDLE: 'bg-blue-500',
  PROGRESS: 'bg-green-500',
  COMPLETED: 'bg-purple-500',
  CANCELLED: 'bg-red-500'
}
</script>

<template>
  <div class="w-full p-5">
    <Button type="button" variant="default"> Adicionar projeto </Button>

    <div class="mt-6 flex flex-col space-y-4">
      <article v-for="project in projects">
        <Separator class="h-[1px] bg-white mb-2" />

        <header class="flex items-center space-x-2">
          <span class="font-bold text-2xl">{{ project.title }}</span>
          <Badge variant="secondary" class="tracking-wide">{{ project.state }}</Badge>
          <Badge variant="secondary" class="tracking-wide">{{ project.sector }}</Badge>
        </header>

        <p class="text-sm text-muted-foreground">{{ project.summary }}</p>

        <!-- <p>Metodologias: {{ project.methodologies }}</p> -->

        <section>
          <p>Vagas</p>
          <div v-for="vacancy in project.vacancies">
            <span>{{ vacancy.title }}</span>
          </div>
        </section>
      </article>
    </div>
  </div>
</template>
<style scoped></style>
