<script setup lang="ts">
// Entites
import type { IVacancyEntity } from '@/entites/IVacancy'

// Utils
import { vacancyLabelState } from '@/utils/labels'

// Shadcn-vue components
import { Badge } from '@/components/ui/badge'

export interface IVacancyBoxProps {
  vacancy: IVacancyEntity
}

defineProps<IVacancyBoxProps>()
</script>

<template>
  <div
    class="p-4 transition-all delay-50 flex flex-col border rounded-md gap-2 shadow-lg hover:shadow-primary/50"
  >
    <header class="flex space-x-2 items-center justify-between relative">
      <span class="text-2xl font-bold">
        {{ vacancy.title }}
      </span>
      <slot name="actions"></slot>
    </header>

    <span>
      {{ vacancy.description }}
    </span>
    <Badge variant="default" class="self-start tracking-wide mt-auto">{{
      vacancyLabelState[vacancy.state]
    }}</Badge>
  </div>
</template>

<style scoped></style>
