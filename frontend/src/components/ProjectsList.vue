<script setup lang="ts">
// App components
import ProjectItem from '@/components/ProjectItem.vue'

// Shadcn-vue components
import { Separator } from '@/components/ui/separator'
// Icons
import {} from 'lucide-vue-next'

// Store pinia
import { useProjectStore } from '@/stores/project'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

export interface IProjectsListProps {
  title?: string
  userId?: number
}

const props = defineProps<IProjectsListProps>()

const projectStore = useProjectStore()

const { projects } = storeToRefs(projectStore)

await projectStore.getProjects(props.title, props.userId)
</script>

<template>
  {{ props.title }}
  <div class="flex flex-col space-y-2" v-for="project in projects">
    <Separator class="mb-2" />
    <ProjectItem :project="project" />
  </div>
</template>

<style scoped></style>
