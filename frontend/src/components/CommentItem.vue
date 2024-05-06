<script setup lang="ts">
// Images
import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg';

// Shadcn-vue components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Pinia imports
import { usePostStore } from '@/stores/post'
import { storeToRefs } from 'pinia'

// Types
import { type ICommentEntity } from '../entites/IComment'

export interface CommentItemProps {
  comment: ICommentEntity
}

const props = defineProps<CommentItemProps>()

const postStore = usePostStore()
</script>

<template>
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
</template>

<style scoped></style>
