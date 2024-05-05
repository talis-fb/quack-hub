<script setup lang="ts">
// Images
import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg'
import type { IPostEntity } from '@/entites/IPost'

// Types
import type { IProjectEntity } from '@/entites/IProject'

// Routes config
import { metadataRoutes } from '@/router/RoutesConfig'
import { postService } from '@/services'

// Vue imports
import { ref } from 'vue'

export interface IPostViewProps {
  post: IPostEntity
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
    <article class="border p-2">
      <header class="flex gap-2">
        <Avatar class="w-16 h-16">
          <AvatarImage :src="DefaultUserIcon" />

          <AvatarFallback>
            <img :src="DefaultUserIcon" alt="avatar_user" />
          </AvatarFallback>
        </Avatar>

        <div>
          <h1 class="text-xl font-bold">User name</h1>
          <p class="text-xl font-semibold">{{ props.post.title }}</p>
          <p class="text-lg">{{ props.post.content }}</p>
        </div>
      </header>

      <img
        class="max-w-[600px] w-full mx-auto"
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

        <Button
          class="hover:bg-white hover:bg-opacity-10 rounded-full"
          variant="ghost"
          size="icon"
          @hover.stop=""
        >
          <MessageSquare />
        </Button>
      </section>
    </article>
  </div>
</template>

<style></style>
