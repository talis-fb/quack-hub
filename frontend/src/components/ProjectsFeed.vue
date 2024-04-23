<script setup lang="ts">
// App components
import ProjectsList from '@/components/ProjectsList.vue'
// Shadcn-vue components
import { Button } from './ui/button'
</script>

<template>
  <div class="w-full p-5">
    <Button type="button" variant="default"> Adicionar projeto </Button>

    <div class="mt-6 flex flex-col space-y-5">
      <ProjectsList />
    </div>
  </div>
</template>
<style scoped></style>
