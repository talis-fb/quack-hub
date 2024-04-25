<script setup lang="ts">
export interface IProjectViewProps {
  id: number
}

const props = defineProps<IProjectViewProps>()
</script>

<template>
  <h1>Project view! {{ props.id }}</h1>
</template>

<style scoped></style>
