<script setup lang="ts">
// App components
import CommentItem from '@/components/CommentItem.vue'

// Shadcn-vue components
import { Separator } from '@/components/ui/separator'
import { Alert, AlertTitle } from '@/components/ui/alert'

// Pinia store
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
  <section class="flex flex-col">
    <div v-if="comments.length" v-for="comment in comments">
      <CommentItem :comment="comment" />
      <Separator />
    </div>
    <div v-else class="p-3">
      <Alert>
        <AlertTitle>Nenhum comentário na postagem. Comente e seja o primeiro!</AlertTitle>
      </Alert>
    </div>
  </section>
</template>

<style></style>
