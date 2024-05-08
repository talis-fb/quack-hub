<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

import Toaster from '@/components/ui/toast/Toaster.vue'

const route = useRoute()

function toggleDarkMode() {
  const body = document.querySelector('body')

  const isDark = body?.classList.contains('dark')

  isDark ? body?.classList.remove('dark') : body?.classList.add('dark')
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <RouterView name="Navbar" />
    <RouterView />
    <Toaster />
  </div>
</template>

<style scoped></style>
