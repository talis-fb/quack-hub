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
    <div v-for="item in Array(props.length).fill(1)" class="p-2">
      <Separator />
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium id eius alias amet
        dolore dolor repellat, veritatis eligendi optio, dolorum ut, adipisci dicta vel minus ipsa?
        At quidem repellat accusantium.
      </span>
    </div>
  </div>
</template>

<style></style>
