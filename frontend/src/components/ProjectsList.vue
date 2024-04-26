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

export interface IProjectsListProps {
  title?: string
  userId?: number
}

const props = defineProps<IProjectsListProps>()

const projectStore = useProjectsStore()

const { projects } = storeToRefs(projectStore)

await projectStore.getProjects(props.title, props.userId)
</script>

<template>
  <div v-if="projects.length" class="flex flex-col space-y-2" v-for="project in projects">
    <Separator class="mb-2" />
    <ProjectItem :project="project" />
  </div>
  <Alert v-else>
    <AlertTitle>Não há projetos cadastrados no momento.</AlertTitle>
  </Alert>
</template>

<style scoped></style>
