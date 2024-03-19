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
  <div class="container">
    <Button variant="outline" @click="toggleDarkMode">Dark mode</Button>
    <Button>Click me!</Button>

    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent> Yes. It adheres to the WAI-ARIA design pattern. </AccordionContent>
      </AccordionItem>
    </Accordion>

    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </div>

  <RouterView />
</template>

<style scoped></style>
