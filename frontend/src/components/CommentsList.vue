<script setup lang="ts">
// Shadcn-vue components
import { Separator } from '@/components/ui/separator'

export interface CommentsListProps {
  postId: number
}

const props = defineProps<CommentsListProps>()
</script>

<template>
  <div>
    <Separator />
    <span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium id eius alias amet dolore
      dolor repellat, veritatis eligendi optio, dolorum ut, adipisci dicta vel minus ipsa? At quidem
      repellat accusantium.
    </span>
  </div>
</template>

<style></style>
