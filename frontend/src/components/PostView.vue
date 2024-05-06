<script setup lang="ts">
// Images
import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg'
import type { IPostEntityWithUser } from '@/entites/IPost'

// Icons
import { ThumbsUp, MessageSquare } from 'lucide-vue-next'

// Routes config
import { metadataRoutes } from '@/router/RoutesConfig'

// Services
import { postService } from '@/services'

// Shadcn-vue components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

// App components
import CommentsList from '@/components/CommentsList.vue'
import CommentsListFallback from '@/components/CommentsListFallback.vue'

// Vue imports
import { computed, onBeforeMount, onMounted, provide, ref, type TextareaHTMLAttributes } from 'vue'

// Store pinia
import { usePostStore } from '@/stores/post'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

// Types
import type { ICommentData } from '@/entites/IComment'


export interface IPostViewProps {
  post: IPostEntityWithUser
}

const postStore = usePostStore()
const authStore = useAuthStore()

const { post } = storeToRefs(postStore)

const props = defineProps<IPostViewProps>()

const textarea = ref<HTMLTextAreaElement | null>(null)

const textComment = ref('')

async function handleSubmit() {
  if (!textComment.value) return

  await createComment({
    postId: post.value?.id as number,
    content: textComment.value
  })

  textComment.value = ''
}

async function createComment(data: ICommentData) {
  await postStore.createComment(data)
}

const adjustTextarea = () => {
  if (!textarea.value) return

  textarea.value.style.height = 'auto'
  textarea.value.style.height = `${textarea.value.scrollHeight}px`
}

onBeforeMount(() => {
  postStore.setPost(props.post)
})

const isPostOwner = computed(() => {
  return props.post.User.id == authStore.user.id
})

provide('isPostOwner', isPostOwner)
</script>

<script lang="ts">
export default {
  beforeRouteEnter: async (to, from) => {
    try {
      const res = await postService.getPostById(+to.params.id)

      to.params = { ...to.params, post: res as any }
    } catch (error) {
      return {
        name: metadataRoutes.NOT_FOUND.name
      }
    }
  }
}
</script>

<template>
  <div class="flex-1 flex justify-center">
    <article class="w-[75%] border">
      <header class="p-2 flex gap-2">
        <Avatar class="w-16 h-16">
          <AvatarImage :src="(post as IPostEntityWithUser).User.avatarUrl ?? ''" />

          <AvatarFallback>
            <img :src="DefaultUserIcon" alt="avatar_user" />
          </AvatarFallback>
        </Avatar>

        <div>
          <h1 class="text-xl font-bold">{{ (post as IPostEntityWithUser).User.name }}</h1>
          <p class="text-xl font-semibold">{{ (post as IPostEntityWithUser).title }}</p>
          <p class="text-lg">{{ (post as IPostEntityWithUser).content }}</p>
        </div>
      </header>

      <img
        class="max-w-[600px] w-full mx-auto rounded-lg"
        src="https://t4.ftcdn.net/jpg/05/47/97/81/360_F_547978128_vqEEUYBr1vcAwfRAqReZXTYtyawpgLcC.jpg"
        alt="Post image"
      />

      <section class="mt-3 mx-auto flex space-x-10 justify-center">
        <Button
          class="hover:bg-white hover:bg-opacity-10 rounded-full"
          variant="ghost"
          size="icon"
          @hover.stop=""
        >
          <ThumbsUp />
        </Button>
      </section>

      <section>
        <div class="py-3 px-2 border flex flex-col space-y-2">
          <div class="flex space-x-2">
            <Avatar class="w-12 h-12">
              <AvatarImage :src="(post as IPostEntityWithUser).User.avatarUrl ?? ''" />

              <AvatarFallback>
                <img :src="DefaultUserIcon" alt="avatar_user" />
              </AvatarFallback>
            </Avatar>

            <textarea
              v-model="textComment"
              ref="textarea"
              @input="(e) => adjustTextarea()"
              placeholder="Postar sua resposta"
              class="w-full bg-transparent border-none outline-none resize-none min-h-[40px] max-h-[200px]"
            />
          </div>

          <Button :disabled="!textComment" variant="default" class="self-end" @click="handleSubmit">
            Responder
          </Button>
        </div>

        <Suspense>
          <CommentsList :post-id="(post as IPostEntityWithUser).id" />
          <template #fallback>
            <CommentsListFallback :length="4" />
          </template>
        </Suspense>
      </section>
    </article>
  </div>
</template>

<style></style>
