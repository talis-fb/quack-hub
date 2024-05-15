<script setup lang="ts">

export interface NewsListFallbackProps {
  length?: number
}

const props = withDefaults(defineProps<NewsListFallbackProps>(), {
  length: 1
})


</script>

<template>
  <div>
    <h2>NewListFallback! {{ length }}</h2>
  </div>
</template>
<style scoped></style>
