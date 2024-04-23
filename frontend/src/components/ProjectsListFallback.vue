<script setup lang="ts">
// Shadcn-vue components
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export interface ExperienceListFallbackProps {
  length?: number
}

const props = withDefaults(defineProps<ExperienceListFallbackProps>(), {
  length: 1
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="space-y-2" v-for="item in Array(props.length).fill(1)">
      <Separator class="mb-4" />
      <Skeleton class="h-4 w-[300px]" />
      <Skeleton class="h-4 w-[225px]" />
      <Skeleton class="h-4 w-[175px]" />
    </div>
  </div>
</template>

<style scoped></style>
