<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
function toggleDarkMode() {
  const body = document.querySelector('body')

  const isDark = body?.classList.contains('dark')

  isDark ? body?.classList.remove('dark') : body?.classList.add('dark')
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <RouterView />
  </div>
</template>

<style scoped></style>
