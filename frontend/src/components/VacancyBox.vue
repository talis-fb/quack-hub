<script setup lang="ts">
// Entites
import type { IVacancyEntity } from '@/entites/IVacancy'

// Utils
import { vacancyLabelState, projectStateLabel } from '@/utils/labels'

// Shadcn-vue components
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

// Icons
import { MoreHorizontalIcon } from 'lucide-vue-next'
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
      <Popover>
        <PopoverTrigger as-child>
          <MoreHorizontalIcon class="cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent class="max-w-[150px] p-0">
          <div class="flex flex-col">
            <div @click.stop="" class="cursor-pointer p-3 text-center hover:bg-muted">Editar</div>
            <div @click.stop="" class="cursor-pointer p-3 text-center hover:bg-muted">Remover</div>
          </div>
        </PopoverContent>
      </Popover>
    </header>

    <span>
      {{ vacancy.description }}
    </span>
    <Badge variant="default" class="tracking-wide mt-auto">{{
      vacancyLabelState[vacancy.state]
    }}</Badge>
  </div>
</template>

<style scoped></style>
