<script setup lang="ts">
import type { IOutputMethodologieEntity } from '@/entites/IMethodologie';


export interface IMethodologieItemProps {
  methodologie: IOutputMethodologieEntity
}

defineProps<IMethodologieItemProps>()
</script>

<template>
  <div variant="secondary" class="bg-indigo-900 p-2 rounded-xl self-start">
    <span class="font-bold text-sm tracking-wide">
      {{ methodologie.name }}
    </span>
  </div>
</template>
