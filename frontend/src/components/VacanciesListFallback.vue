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
  <div
    v-for="item in Array(props.length).fill(1)"
    class="p-4 flex flex-col border rounded-md space-y-5"
  >
    <Skeleton class="h-4 w-[200px]" />
    <Skeleton class="h-4 w-[175px]" />
    <Skeleton class="h-4 w-[175px]" />
    <Skeleton class="h-4 w-[125px]" />
  </div>
</template>

<style scoped></style>
