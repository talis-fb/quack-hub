<script setup lang="ts">
// Images
import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg'

// Shadcn-vue components
import { Separator } from '@/components/ui/separator'
import type { ICommentData, ICommentEntity } from '@/entites/IComment'
import { postService } from '@/services'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Vue imports
import { computed, ref } from 'vue'

export interface CommentsListProps {
  postId: number
}

const props = defineProps<CommentsListProps>()

const comments = ref<ICommentEntity[]>([])

const fetchComments = async (postId: number) => {
  const res = await postService.getCommentsByPostId(postId)

  // await new Promise((resolve) => setTimeout(resolve, 1500))

  comments.value = res
}

await fetchComments(props.postId)
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
