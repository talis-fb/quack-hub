<script setup lang="ts">
// Shadcn-vue components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'

// Icons
import { ArrowRight, ThumbsUp, MessageSquare } from 'lucide-vue-next'

import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg'
</script>

<template>
  <article class="post border rounded-md p-2">
    <header class="flex pl-2 pb-2 gap-2">
      <Avatar class="w-16 h-16">
        <AvatarImage :src="DefaultUserIcon" />

        <AvatarFallback>
          <img :src="DefaultUserIcon" alt="avatar_user" />
        </AvatarFallback>
      </Avatar>

      <div>
        <h1 class="text-xl font-bold">User name</h1>
        <p class="text-justify">
          Texto falando abobrinha pra caramba sobre a postagem, de preferência falando sobre
          motivação e coach. Tambem trataremos de como questões quanticas influênciam no seu dia a
          dia, como na sua personalidade e vida amorosa, igual signo, mas signo não é ciêntifico,
          coisas quânticas são.
        </p>
      </div>
    </header>

    <img
      class="max-w-[600px] w-full mx-auto"
      src="https://t4.ftcdn.net/jpg/05/47/97/81/360_F_547978128_vqEEUYBr1vcAwfRAqReZXTYtyawpgLcC.jpg"
      alt="Post image"
    />

    <section class="mt-3 mx-auto flex space-x-10 justify-center">
      <div class="flex gap-2 items-center hover:cursor-pointer"><ThumbsUp /> Gostei</div>
      <div class="flex gap-2 items-center hover:cursor-pointer"><MessageSquare /> Comentário</div>
    </section>
  </article>
</template>

<style></style>
