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
  <div class="w-full p-5">
    <div class="mt-6 flex flex-col space-y-5">
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
