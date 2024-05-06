<script setup lang="ts">
// Images
import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg'

// Icons
import { ChevronDown } from 'lucide-vue-next'

// Shadcn-vue components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'

// App components
import AppDialog from '@/components/AppDialog.vue'
import EditComment from '@/components/EditComment.vue'

// Pinia imports
import { usePostStore } from '@/stores/post'
import { storeToRefs } from 'pinia'

// Types
import { type ICommentData, type ICommentEntityWithUserAndPostId } from '../entites/IComment'
import { ref } from 'vue'

export interface CommentItemProps {
  comment: ICommentEntityWithUserAndPostId
}

async function handleDeleteComment(commentId: number) {
  await postStore.deleteComment(commentId)
}

async function handleUpdateComment(commentId: number, data: Partial<ICommentData>) {
  await postStore.updateComment(commentId, data)
}

const props = defineProps<CommentItemProps>()

const postStore = usePostStore()

const textComment = ref('')
</script>

<template>
  <div class="flex px-2 py-3 gap-2">
    <Avatar class="w-12 h-12">
      <AvatarImage :src="comment.User.avatarUrl ?? ''" />

      <AvatarFallback>
        <img :src="DefaultUserIcon" alt="avatar_user" />
      </AvatarFallback>
    </Avatar>

    <div class="relative flex-1 space-y-2">
      <p>
        {{ comment.User.name }}
      </p>
      <p>
        {{ comment.content }}
      </p>

      <div class="absolute top-0 right-0">
        <Popover :modal="true">
          <PopoverTrigger as-child>
            <ChevronDown class="cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent class="max-w-[150px] p-0">
            <div class="flex flex-col">
              <AppDialog>
                <template #trigger>
                  <div class="cursor-pointer p-3 text-center hover:bg-muted">Editar</div>
                </template>
                <template #title> Editer comentário '{{ comment.content }}' </template>
                <template #description> Edite seu comentário, antes que os outros vejam! </template>
                <template #main>
                  <EditComment
                    :comment="comment"
                    @update="(content) => handleUpdateComment(props.comment.id, { content })"
                  />
                </template>
              </AppDialog>

              <div
                @click="(e) => handleDeleteComment(comment.id)"
                class="cursor-pointer p-3 text-center hover:bg-muted"
              >
                Remover
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
