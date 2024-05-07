<script setup lang="ts">
// Shadcn-vue components
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export interface PostsListFallbackProps {
  length?: number
}

const props = withDefaults(defineProps<PostsListFallbackProps>(), {
  length: 1
})
</script>

<template>
  <div class="flex flex-col">
    <div v-for="item in Array(props.length).fill(1)" class="p-2">
      <div class="flex gap-2">
        <Skeleton class="w-16 h-16 rounded-full" />
        <div class="flex-1 space-y-2">
          <Skeleton class="h-4 w-[225px] max-w-[full]" />

          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-[90%]" />
        </div>
      </div>

      <Skeleton class="mt-2 mx-auto h-[300px] w-[full]" />
    </div>
  </div>
</template>

<style scoped></style>
