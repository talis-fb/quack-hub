<script setup lang="ts">
// Images
import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg'

// Shadcn-vue components
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
      <div class="flex px-2 py-3 gap-2">
        <Avatar class="w-12 h-12">
          <AvatarImage :src="comment.User.avatarUrl ?? ''" />

          <AvatarFallback>
            <img :src="DefaultUserIcon" alt="avatar_user" />
          </AvatarFallback>
        </Avatar>

        <div class="flex-1 space-y-2">
          <p>
            {{ comment.User.name }}
          </p>
          <p>
            {{ comment.content }}
          </p>
        </div>
      </div>
      <Separator />
    </div>
  </div>
</template>

<style></style>
