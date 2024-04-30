<script setup lang="ts">
export interface IMethodologieItemProps {
  content: string
}

defineProps<IMethodologieItemProps>()
</script>

<template>
  <div variant="secondary" class="bg-indigo-900 p-2 rounded-xl self-start">
    <span class="font-bold text-sm tracking-wide">
      {{ content }}
    </span>
  </div>
</template>
