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
  <div class="flex flex-col space-y-2">
    <div v-for="item in Array(props.length).fill(1)" class="px-4 py-3 flex space-x-2">
      <div>
        <Skeleton class="w-20 h-20 rounded-full" />
      </div>

      <div class="flex-1 flex flex-col space-y-2">
        <Skeleton class="h-4 w-[100%] max-w-[300px]" />

        <Skeleton class="h-4 w-[80%] max-w-[225px]" />
        <Skeleton class="h-4 w-[60%] max-w-[175px]" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
