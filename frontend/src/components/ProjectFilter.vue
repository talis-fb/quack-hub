<script setup lang="ts">
// Shadcn-vue components
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'

//Icons
import { ArrowUpCircle, CheckCircle2, HelpCircle, PlusCircle, XCircle } from 'lucide-vue-next'
import Separator from './ui/separator/Separator.vue'

interface Status {
  value: string
  label: string
  icon: any //Icon
}

const statuses: Status[] = [
  {
    value: 'PAUSED',
    label: 'Pausado',
    icon: HelpCircle
  },
  {
    value: 'PROGRESS',
    label: 'Em progresso',
    icon: ArrowUpCircle
  },
  {
    value: 'COMPLETED',
    label: 'FInalizado',
    icon: CheckCircle2
  },
  {
    value: 'CANCELLED',
    label: 'Cancelado',
    icon: XCircle
  }
]

const open = ref(false)

const selectedStatus = defineModel<string[]>('selectedStatus', { required: true, default: [] })
const title = defineModel<string>('title', { required: true })
</script>

<template>
  <div class="flex items-center space-x-5 p-3">
    <Input v-model="title" class="max-w-[45%]" placeholder="Filtrar projetos..." />

    <div class="flex items-center space-x-4">
      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button variant="outline" size="sm" class="flex space-x-2">
            <PlusCircle class="min-w-4 h-4" />
            <span class="text-sm text-muted-foreground">Status</span>
            <Separator orientation="vertical" />

            <span class="p-1 bg-secondary rounded-sm">{{ selectedStatus.length }}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent class="p-0" side="bottom" align="start">
          <Command>
            <CommandInput placeholder="Status" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  v-for="(status, index) in statuses"
                  :key="status.value"
                  :value="status.value"
                  @select="
                    (e) => {
                      const exist = selectedStatus.includes(status.value)

                      if (!exist) {
                        selectedStatus = [...selectedStatus, status.value]
                      } else {
                        const newSelectedStatus = selectedStatus.filter(
                          (item) => item !== status.value
                        )

                        selectedStatus = newSelectedStatus
                      }
                    }
                  "
                >
                  <Checkbox
                    :checked="selectedStatus.includes(status.value)"
                    :id="status.value"
                    class="mr-2"
                  />

                  <label class="flex">
                    <component :is="status.icon" class="mr-2 h-4 w-4" />
                    <span>{{ status.label }}</span>
                  </label>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>
<style scoped></style>
