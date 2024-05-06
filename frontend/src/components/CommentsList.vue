<script setup lang="ts">
// App components
import CommentItem from '@/components/CommentItem.vue'

// Shadcn-vue components
import { Separator } from '@/components/ui/separator'

// Vue imports

import { usePostStore } from '@/stores/post'
import { storeToRefs } from 'pinia'

export interface CommentsListProps {
  postId: number
}

const props = defineProps<CommentsListProps>()

const postStore = usePostStore()
const { comments } = storeToRefs(postStore)

await postStore.fetchComments(props.postId)
</script>

<template>
  <div class="flex flex-col">
    <div v-for="comment in comments">
      <CommentItem :comment="comment" />
      <Separator />
    </div>
  </div>
</template>

<style></style>
