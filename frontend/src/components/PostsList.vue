<script setup lang="ts">
import PostItem from '@/components/PostItem.vue'
import type { IPostEntity } from '@/entites/IPost'
import { postService } from '@/services'
import { ref } from 'vue'

const posts = ref<IPostEntity[]>([])

const fetchPosts = async () => {
  const res = await postService.search()

  await new Promise((resolve) => setTimeout(resolve, 2000))
  posts.value = res
}

await fetchPosts()
</script>

<template>
  <div v-for="post in posts">
    <PostItem :post="post" />
  </div>
</template>
<style scoped></style>
