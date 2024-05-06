<script setup lang="ts">
import PostItem from '@/components/PostItem.vue'
import type { IPostEntityWithUser } from '@/entites/IPost'
import { postService } from '@/services'
import { ref } from 'vue'

const posts = ref<IPostEntityWithUser[]>([])

const fetchPosts = async () => {
  const res = await postService.search()

  // await new Promise((resolve) => setTimeout(resolve, 1500))
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
