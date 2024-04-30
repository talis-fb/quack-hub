<script setup lang="ts">
// App components
import ProjectsList from '@/components/ProjectsList.vue'
import ProjectsListFallback from '@/components/ProjectsListFallback.vue'

// Shadcn-vue components
import { provide, Suspense } from 'vue'
import { useToast } from './ui/toast'

const { toast } = useToast()

provide('hasPermissions', false)
</script>

<template>
  <div class="w-full">
    <div class=" flex flex-col">
      <Suspense>
        <ProjectsList />
        <template #fallback>
          <ProjectsListFallback :length="5" />
        </template>
      </Suspense>
    </div>
  </div>
</template>
<style scoped></style>
