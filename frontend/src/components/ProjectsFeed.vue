<script setup lang="ts">
// App components
import ProjectsList from '@/components/ProjectsList.vue'
import ProjectsListFallback from '@/components/ProjectsListFallback.vue'

// Shadcn-vue components
import { provide, ref, Suspense } from 'vue'
import { useToast } from '@/components/ui/toast'
import { Input } from '@/components/ui/input'

const { toast } = useToast()

const title = ref('')

provide('hasPermissions', false)
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col">
      <div class="p-3">
        <Input v-model="title" class="max-w-[50%]" placeholder="Filtrar projetos..." />
      </div>
      <Suspense>
        <ProjectsList :title="title"/>
        <template #fallback>
          <ProjectsListFallback :length="5" />
        </template>
      </Suspense>
    </div>
  </div>
</template>
<style scoped></style>
