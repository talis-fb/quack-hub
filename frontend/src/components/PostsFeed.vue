<script setup lang="ts">
// App components
import PostsList from '@/components/PostsList.vue'
import PostsListFallback from '@/components/PostsListFallback.vue'
import PostItem from '@/components/PostItem.vue'
</script>

<template>
  <div class="w-full">
    <Suspense>
      <PostsList />
      <template #fallback>
        <PostsListFallback :length="2" />
      </template>
    </Suspense>
  </div>
</template>
<style scoped></style>
