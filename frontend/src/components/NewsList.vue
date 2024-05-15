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

await fetchNews()
</script>

<template>
  <ul>
    <li>Noticia 01</li>
    <li>Noticia 02</li>
    <li>Noticia 03</li>
  </ul>
</template>
<style scoped></style>
