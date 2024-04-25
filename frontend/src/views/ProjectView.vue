<script setup lang="ts">
import type { IProjectEntity } from '@/entites/IProject';
import { onMounted, ref } from 'vue';

export interface IProjectViewProps {
  id: number
}

const props = defineProps<IProjectViewProps>()

const project = ref<IProjectEntity | null>(null);

onMounted(async () => {

})
</script>

<template>
  <h1>Project view! {{ props.id }}</h1>
</template>

<style scoped></style>
