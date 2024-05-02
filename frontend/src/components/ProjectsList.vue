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
import { watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

export interface IProjectsListProps {
  title?: string
  userId?: number
}

const props = defineProps<IProjectsListProps>()

const projectStore = useProjectsStore()

const { projects } = storeToRefs(projectStore)

const getProjects = useDebounceFn(async () => {
  await projectStore.getProjects(props.title, props.userId)
}, 500)

await projectStore.getProjects(props.title, props.userId)

watch(
  () => props.title,
  async (newTitle) => {
    await getProjects()
  }
)
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
