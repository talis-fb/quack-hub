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

defineOptions({
  inheritAttrs: true
})
const projectStore = useProjectStore()

const { projects } = storeToRefs(projectStore)

await projectStore.getProjects()
</script>

<template>
  <div class="flex flex-col space-y-2" v-for="project in projects">
    <Separator class="mb-2" />
    <ProjectItem :project="project" />
  </div>
</template>

<style scoped></style>
