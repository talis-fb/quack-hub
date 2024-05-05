<script setup lang="ts">
// Images
import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg'

// Shadcn-vue components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Button from './ui/button/Button.vue'

// Icons
import { ThumbsUp, MessageSquare } from 'lucide-vue-next'
import type { IPostEntity } from '@/entites/IPost'

export interface IPostItemProps {
  post: IPostEntity
}

const props = defineProps<IPostItemProps>()
</script>

<template>
  <article class="border p-2 hover:bg-muted transition delay-50 cursor-pointer">
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
</template>

<style></style>
