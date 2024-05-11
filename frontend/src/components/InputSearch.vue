<script setup lang="ts">
// Icons
import { Search } from 'lucide-vue-next'

// Shadcn-vue components
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'

// Vue-use
import { useFocus } from '@vueuse/core'

// Vue imports
import { ref } from 'vue'

export interface IInputSearchProps {}

const showSuggestions = ref<boolean>(false)

const buttonOpenRef = ref<HTMLButtonElement | null>(null)

const inputSearch = ref<HTMLInputElement | null>(null)

const { focused: focusedInputSearch } = useFocus(inputSearch)

const { focused: focusedButtonOpen } = useFocus(buttonOpenRef)

const search = defineModel<string>('search', { required: true })

function toggleSugestion() {
  showSuggestions.value = !showSuggestions.value
}
</script>

<template>
  <div class="flex-1 relative" role="search">
    <Button
      ref="buttonOpenRef"
      size="icon"
      variant="ghost"
      class="bg-transparent hover:bg-transparent peer absolute left-0 flex items-center justify-center px-2 rounded-full h-[50px] w-[50px]"
    >
      <Search />
    </Button>

    <Input
      class="pr-3 pl-10 ease-in transition-all duration-300 bg-muted rounded-full h-[50px] w-[50px] peer-focus:w-full focus:w-full"
      placeholder="Pesquisar no Quackhub"
      ref="inputSearch"
      v-model="search"
      @focus="toggleSugestion"
      @blur="toggleSugestion"
    />

    <section v-if="showSuggestions" class="w-full absolute bg-black border rounded-lg">
      <slot name="suggestions"></slot>
    </section>
  </div>
</template>

<style scoped></style>
