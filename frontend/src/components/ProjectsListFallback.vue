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
      <Skeleton class="size-20 rounded-full" />

      <div class="flex flex-col space-y-2">
        <div class="flex space-x-2">
          <Skeleton class="h-4 w-[300px]" />
        </div>

        <Skeleton class="h-4 w-[225px]" />
        <Skeleton class="h-4 w-[175px]" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
