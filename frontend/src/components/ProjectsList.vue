<script setup lang="ts">
// App components
import ProjectItem from '@/components/ProjectItem.vue'

// Shadcn-vue components
import { Separator } from '@/components/ui/separator'
import { Alert, AlertTitle } from '@/components/ui/alert'

// Icons
import {} from 'lucide-vue-next'

// Store pinia
import { useProjectsStore } from '@/stores/projects'
import { storeToRefs } from 'pinia'
import { watch, watchEffect } from 'vue'
import { useDebounceFn } from '@vueuse/core'

export interface IProjectsListProps {
  title?: string
  userId?: number
  statesProject?: string[]
}

const props = defineProps<IProjectsListProps>()

const projectStore = useProjectsStore()

const { projects } = storeToRefs(projectStore)

const findProjects = useDebounceFn(
  async (title?: string, userId?: number, statesProject?: string[]) => {
    await projectStore.getProjects(title, userId, statesProject)
  },
  500
)

await projectStore.getProjects(props.title, props.userId, props.statesProject)

watchEffect(async () => {
  await findProjects(props.title, props.userId, props.statesProject)
})
</script>

<template>
  <div v-if="projects.length" class="flex flex-col" v-for="project in projects">
    <ProjectItem :project="project" />
    <Separator />
  </div>
  <Alert v-else>
    <AlertTitle>Nenhum projeto encontrado</AlertTitle>
  </Alert>
</template>

<style scoped></style>
