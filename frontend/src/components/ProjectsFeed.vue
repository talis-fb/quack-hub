<script setup lang="ts">
// App components
import ProjectsList from '@/components/ProjectsList.vue'
import ProjectsListFallback from '@/components/ProjectsListFallback.vue'

// Shadcn-vue components
import { provide, ref, Suspense } from 'vue'

// App components
import ProjectFilter from './ProjectFilter.vue'

const title = ref<string>('')
const selectedStatus = ref<string[]>([])

provide('hasPermissions', false)
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col">
      <ProjectFilter v-model:title="title" v-model:selected-status="selectedStatus" />

      <Suspense>
        <ProjectsList :title="title" />
        <template #fallback>
          <ProjectsListFallback :length="5" />
        </template>
      </Suspense>
    </div>
  </div>
</template>
<style scoped></style>
