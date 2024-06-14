<script setup lang="ts">
// Shadcn-vue components
import { Skeleton } from '@/components/ui/skeleton'

export interface AnnouncementsListFallbackProps {
  length?: number
}

const props = withDefaults(defineProps<AnnouncementsListFallbackProps>(), {
  length: 1
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div v-for="item in Array(props.length).fill(1)">
      <div class="p-4 gap-1">
        <Skeleton class="ms-4 h-6 w-[250px] max-w-[80%] rounded-t-lg rounded-b-none" />

        <Skeleton class="h-[150px] w-full" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
