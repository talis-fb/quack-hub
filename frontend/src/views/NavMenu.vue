<script setup lang="ts">
import { metadataRoutes } from '@/router/RoutesConfig'
import AvatarDefault from '@/assets/user-icon.jpg'

// Icons
import { Home } from 'lucide-vue-next'
import { BadgeInfo } from 'lucide-vue-next'
import { ArrowDown } from 'lucide-vue-next'

// Components shadcn-vue
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>
<template>
  <nav class="flex px-4 items-center justify-between">
    <header>
      <RouterLink :to="metadataRoutes.HOME.path"
        ><img class="max-h-20" src="../assets/logo.png" alt="quackhub-logo"
      /></RouterLink>
    </header>

    <div class="flex md:gap-4 gap-8">
      <RouterLink
        class="flex gap-2 items-center text-lg hover:text-blue-500"
        :to="metadataRoutes.HOME.path"
      >
        <Home />
        <p class="md:block hidden">Home</p>
      </RouterLink>

      <RouterLink
        class="flex gap-2 items-center text-lg hover:text-blue-500"
        :to="metadataRoutes.ABOUT.path"
      >
        <BadgeInfo />
        <p class="md:block hidden">About</p>
      </RouterLink>

      <RouterLink
        class="flex items-center gap-1 text-lg hover:text-blue-500"
        :to="metadataRoutes.USER_PROFILE.path"
      >
        <Avatar>
          <AvatarImage src="https://urlnaoencontrada.com/radix-vue.png" alt="user-avatar" />
          <AvatarFallback>
            <img :src="AvatarDefault" alt="user-avatar-default" />
          </AvatarFallback>
        </Avatar>
        <ArrowDown class="w-6" />
      </RouterLink>
    </div>
  </nav>
</template>
<style></style>
