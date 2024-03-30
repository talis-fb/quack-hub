<script setup lang="ts">
import { metadataRoutes } from '@/router/RoutesConfig'
import { Home } from 'lucide-vue-next'
import { BadgeInfo } from 'lucide-vue-next'
import { ArrowDown } from 'lucide-vue-next'
</script>
<template>
  <nav class="flex relative m-1">
    <RouterLink :to="metadataRoutes.HOME.path"
      ><img class="max-h-20 ml-6" src="../assets/logo.png" alt="quackhub-logo"
    /></RouterLink>
    <main class="flex gap-6 absolute right-24">
      <RouterLink
        class="flex gap-2 items-center mt-5 text-lg hover:text-blue-700"
        :to="metadataRoutes.HOME.path"
      >
        <Home />
        <p>Home</p>
      </RouterLink>
      <RouterLink
        class="flex gap-2 items-center mt-5 text-lg hover:text-blue-700 pr-9 border-r-4 border-white"
        :to="metadataRoutes.ABOUT.path"
      >
        <BadgeInfo />
        <p>About</p>
      </RouterLink>
      <RouterLink
        class="flex gap-2 items-center mt-5 text-lg hover:text-blue-700 mr-9"
        :to="metadataRoutes.USER_PROFILE.path"
      >
        <img class="max-h-10 rounded-full" src="@/assets/user-icon.jpg" alt="user-profile" />
        <ArrowDown />
      </RouterLink>
    </main>
  </nav>
</template>
<style></style>
