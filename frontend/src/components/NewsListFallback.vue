<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'

export interface NewsListFallbackProps {
  length?: number
}

const props = withDefaults(defineProps<NewsListFallbackProps>(), {
  length: 1
})
</script>

<template>
  <ul class="space-y-3">
    <li v-for="item in Array(props.length).fill(1)" class="border rounded-md">
      <Skeleton class="mx-auto h-[300px] w-[full]" />
      <section class="flex flex-col space-y-3 p-2">
        <Skeleton class="h-4 max-w-[full]" />
        <Skeleton class="h-4 max-w-[75%]" />
        <Skeleton class="h-4 max-w-[65%]" />
      </section>
    </li>
  </ul>
</template>
<style scoped></style>
