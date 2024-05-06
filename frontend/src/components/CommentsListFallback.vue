<script setup lang="ts">
// Shadcn-vue components
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export interface CommentsListFallbackProps {
  length?: number
}

const props = withDefaults(defineProps<CommentsListFallbackProps>(), {
  length: 1
})
</script>

<template>
  <div class="flex flex-col">
    <div v-for="item in Array(props.length).fill(1)">
      <div class="flex px-2 py-3 gap-2">
        <Skeleton class="w-12 h-12 rounded-full" />
        <div class="flex-1 space-y-2">
          <Skeleton class="h-4 w-[150px] max-w-[full]" />

          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-full" />
        </div>
      </div>
      <Separator />
    </div>
  </div>
</template>

<style></style>
