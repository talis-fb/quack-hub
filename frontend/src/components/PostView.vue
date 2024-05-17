<script setup lang="ts">
// Images
import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg'

// Types
import type { ICommentData } from '@/entites/IComment'
import type { IPostData, IPostEntityWithUser } from '@/entites/IPost'
import type { IUserEntity } from '@/entites/IUser'

// Icons
import { ThumbsUp, Ellipsis, ChevronDown, Dot } from 'lucide-vue-next'

// Routes config
import { metadataRoutes } from '@/router/RoutesConfig'

// Services
import { postService, userService } from '@/services'

// Shadcn-vue components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useToast } from './ui/toast'

// App components
import CommentsList from '@/components/CommentsList.vue'
import CommentsListFallback from '@/components/CommentsListFallback.vue'
import AppDialog from '@/components/AppDialog.vue'
import PostForm from '@/components/PostForm.vue'

// Vue imports
import { computed, onBeforeMount, provide, ref } from 'vue'
import { useRouter } from 'vue-router'

// Store pinia
import { usePostStore } from '@/stores/post'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

export interface IPostViewProps {
  post: IPostEntityWithUser
}

const router = useRouter()

const postStore = usePostStore()
const authStore = useAuthStore()

const { post } = storeToRefs(postStore)

const props = defineProps<IPostViewProps>()

const { toast } = useToast()

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

async function deletePost(postId: number) {
  try {
    await postService.delete(postId)

    router.push({ path: metadataRoutes.HOME.path })

    toast({
      title: 'Postagem',
      description: 'Postagem removida com sucesso!',
      variant: 'default',
      duration: 2000
    })
  } catch (error) {
    toast({
      title: 'Erro ao remover postagem',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
}

async function updatePost(postId: number, data: IPostData) {
  try {
    await postStore.updatePost(postId, data)

    toast({
      title: 'Postagem',
      description: 'Postagem atualizada com sucesso!',
      variant: 'default',
      duration: 2000
    })
  } catch (error) {
    toast({
      title: 'Erro ao atualizar postagem',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
}


const user = ref<IUserEntity | null>(null)

async function fetchUser(userId: number) {
  const res = await userService.getUserById(userId)

  return res
}

onBeforeMount(async () => {
  if (!authStore.user.id) return

  user.value = await fetchUser(authStore.user.id)
})
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
  <div class="mt-4 flex-1 flex justify-center">
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

        <div v-if="isPostOwner" class="ms-auto">
          <Popover :modal="true">
            <PopoverTrigger as-child>
              <Ellipsis class="cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent class="max-w-[150px] p-0">
              <div class="flex flex-col">
                <AppDialog>
                  <template #trigger>
                    <div class="cursor-pointer p-3 text-center hover:bg-muted">Editar</div>
                  </template>
                  <template #title> Editar postagem </template>
                  <template #description> Edite sua postagem antes que os usuários vejam!</template>
                  <template #main>
                    <PostForm
                      :content="props.post.content"
                      :title="props.post.title"
                      :image-url="props.post.imageUrl"
                      @submited="(data) => updatePost(props.post.id, data)"
                    />
                  </template>
                </AppDialog>

                <div
                  @click="() => deletePost(props.post.id)"
                  class="cursor-pointer p-3 text-center hover:bg-muted"
                >
                  Remover
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      <img
        v-if="props.post.imageUrl"
        class="max-w-[600px] w-full mx-auto rounded-lg"
        :src="props.post.imageUrl"
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
              <AvatarImage :src="user?.avatarUrl ?? ''" />

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
