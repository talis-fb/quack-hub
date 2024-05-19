<script setup lang="ts">
// Types
import type { INewsEntity } from '@/entites/INews'

// Services
import { newsService } from '@/services'

// Vue imports
import { ref } from 'vue'

const news = ref<INewsEntity[]>([])

async function fetchNews() {
  const res = await newsService.getNews()

  news.value = res
}

function redirectToNew(url: string) {
  // window.location.href = url
  window.open(url, '_blank')
}

await fetchNews()
</script>

<template>
  <ul class="space-y-3">
    <li
      @click="() => redirectToNew(notice.url)"
      v-for="notice in news"
      class="overflow-hidden cursor-pointer shadow-xl hover:shadow-primary/70 border rounded-md"
    >
      <figure>
        <img class="max-w-full" :src="notice.imageURL" alt="notice_image" />
      </figure>
      <section class="p-2 text-center bg-white">
        <p class="font-bold text-black text-lg">
          {{ notice.title }}
        </p>
        <p class="text-sm text-gray-500">
          {{ notice.description }}
        </p>
      </section>
    </li>
  </ul>
</template>
<style scoped></style>
