<script setup lang="ts">
// Images
import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg'

// Shadcn-vue components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Button from './ui/button/Button.vue'

// Icons
import { ThumbsUp, MessageSquare } from 'lucide-vue-next'
import type { IPostEntityWithUser } from '@/entites/IPost'
import { useRouter } from 'vue-router'
import { metadataRoutes } from '@/router/RoutesConfig'

export interface IPostItemProps {
  post: IPostEntityWithUser
}

const props = defineProps<IPostItemProps>()

const router = useRouter()

const navigateToPost = () => {
  router.push({ name: metadataRoutes.POST.name, params: { id: props.post.id } })
}
</script>

<template>
  <article
    @click="navigateToPost"
    class="border p-2 hover:bg-muted transition delay-50 cursor-pointer"
  >
    <header class="flex gap-2">
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
</template>

<style></style>
