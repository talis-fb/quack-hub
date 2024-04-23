<script setup lang="ts">
// App components
import ProjectsList from '@/components/ProjectsList.vue'
import ProjectsListFallback from '@/components/ProjectsListFallback.vue'

// Shadcn-vue components
import { Button } from './ui/button'
import { Suspense } from 'vue'
</script>

<template>
  <div class="w-full p-5">
    <Button type="button" variant="default"> Adicionar projeto </Button>

    <div class="mt-6 flex flex-col space-y-5">
      <Suspense>
        <ProjectsList />
        <template #fallback>
          <ProjectsListFallback :length="5"/>
        </template>
      </Suspense>
    </div>
  </div>
</template>
<style scoped></style>
