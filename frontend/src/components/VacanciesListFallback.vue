<script setup lang="ts">
// Shadcn-vue components
import { Skeleton } from '@/components/ui/skeleton'

export interface VacanciesListFallbackProps {
  length?: number
}

const props = withDefaults(defineProps<VacanciesListFallbackProps>(), {
  length: 1
})
</script>

<template>
  <div class="p-4 flex flex-wrap gap-3">
    <div v-for="item in Array(props.length).fill(1)" class="w-[200px] h-[150px] p-4 flex flex-col border rounded-md space-y-5">
      <Skeleton class="h-4 w-full" />
      <Skeleton class="h-4 w-[75%]" />
      <Skeleton class="h-4 w-[75%]" />
      <Skeleton class="h-4 w-[50%]" />
    </div>
  </div>
</template>

<style scoped></style>
