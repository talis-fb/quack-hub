<script setup lang="ts">
// date-fns
import { cn } from '@/lib/utils'

// Shadcn-vue components
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'

// Icons
import { Check, ChevronsUpDown } from 'lucide-vue-next'

// Vue imports
import { ref } from 'vue'
import type { IOutputMethodologieEntity } from '@/entites/IMethodologie'

export interface IMethodologieFieldProps {
  methodologies: IOutputMethodologieEntity[]
}

export interface IMethodologieFieldEmits {
  (e: 'update', value: string): void
}

const emits = defineEmits<IMethodologieFieldEmits>()

const props = defineProps<IMethodologieFieldProps>()

const open = ref(false)
const value = ref('')
</script>

<template>
  <Popover v-model:open="open" :modal="true">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[300px] justify-between"
      >
        {{
          value
            ? props.methodologies.find((methodologie) => methodologie.name === value)?.name
            : 'Selecione a metodologia...'
        }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="left-0 cuzaoi right-0 w-[300px] p-0" side="top">
      <Command>
        <CommandInput class="h-9" placeholder="Procurar metodologia..." />
        <CommandEmpty>Nenhuma metodologia encontrada.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="methodologie in methodologies"
              :key="methodologie.name"
              :value="methodologie.name"
              @select="
                (ev) => {
                  if (typeof ev.detail.value === 'string') {
                    value = ev.detail.value
                    emits('update', methodologie.id.toString())
                  }
                  open = false
                }
              "
            >
              {{ methodologie.name }}
              <Check
                :class="
                  cn('ml-auto h-4 w-4', value === methodologie.name ? 'opacity-100' : 'opacity-0')
                "
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<style></style>
