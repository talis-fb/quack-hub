<script setup lang="ts">
// Images
import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg'
import type { IPostEntityWithUser } from '@/entites/IPost'

// Types
import type { IProjectEntity } from '@/entites/IProject'

// Icons
import { ThumbsUp, MessageSquare } from 'lucide-vue-next'

// Routes config
import { metadataRoutes } from '@/router/RoutesConfig'
import { postService } from '@/services'

// Shadcn-vue components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import Button from './ui/button/Button.vue'

// App components
import CommentsList from '@/components/CommentsList.vue'

// Vue imports
import { ref } from 'vue'

export interface IPostViewProps {
  post: IPostEntityWithUser
}

const props = defineProps<IPostViewProps>()
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
    <article class="max-w-[50%] border">
      <header class="p-2 flex gap-2">
        <Avatar class="w-16 h-16">
          <AvatarImage :src="DefaultUserIcon" />

          <AvatarFallback>
            <img :src="DefaultUserIcon" alt="avatar_user" />
          </AvatarFallback>
        </Avatar>

        <div>
          <h1 class="text-xl font-bold">{{ props.post.User.name }}</h1>
          <p class="text-xl font-semibold">{{ props.post.title }}</p>
          <p class="text-lg">{{ props.post.content }}</p>
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
        <CommentsList :post-id="props.post.id" />
      </section>
    </article>
  </div>
</template>

<style></style>
