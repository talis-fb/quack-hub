<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import Toaster from '@/components/ui/toast/Toaster.vue'
import NavMenu from "@/views/NavMenu.vue";

function toggleDarkMode() {
  const body = document.querySelector('body')

  const isDark = body?.classList.contains('dark')

  isDark ? body?.classList.remove('dark') : body?.classList.add('dark')
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavMenu />
    <RouterView />
    <Toaster />
  </div>
</template>

<style scoped></style>
