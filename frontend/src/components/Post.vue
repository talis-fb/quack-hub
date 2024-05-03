<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { ArrowRight, ThumbsUp, MessageSquare } from 'lucide-vue-next';
</script>

<template>
  <div class="post border rounded-md p-2">
    <div class="flex pl-2 pb-2 gap-2">
      <img
        class="max-w-16 max-h-16 rounded-full"
        src="../assets/DefaultUserIcon.jpg"
        alt="User profile post"
      />
      <div>
        <h1 class="text-xl font-bold">User name</h1>
        <p class="text-justify">
          Texto falando abobrinha pra caramba sobre a postagem, de preferência falando sobre
          motivação e coach. Tambem trataremos de como questões quanticas influênciam no seu dia a
          dia, como na sua personalidade e vida amorosa, igual signo, mas signo não é ciêntifico,
          coisas quânticas são.
        </p>
      </div>
    </div>

    <img src="../assets/DefaultUserIcon.jpg" alt="Post" class="pb-2 image" />

    <div class="m-3 flex gap-6">
      <div class="flex gap-2 items-center hover:cursor-pointer hover:text-orange-400">
        <ThumbsUp /> Gostei
      </div>
      <div class="flex gap-2 items-center hover:cursor-pointer hover:text-orange-400">
        <MessageSquare /> Comentário
      </div>
    </div>

    <div class="flex items-center justify-center gap-1">
      <Input type="text" placeholder="Comentario..." />
      <div class="hover:cursor-pointer hover:text-orange-400">
        <ArrowRight size="2rem" />
      </div>
    </div>

    <div class="flex justify-between items-center gap-1 mt-3 border p-2">
      <div class="flex items-center gap-2 pl-2">
        <img
          class="rounded-full w-12"
          src="../assets/DefaultUserIcon.jpg"
          alt="User profile comment"
        />
        <p>Texto do comentario aqui</p>
      </div>
      <ThumbsUp class="hover:cursor-pointer hover:text-orange-400" />
    </div>
  </div>
</template>

<style>
.post {
  max-width: 70%;
  height: auto;
}
</style>
