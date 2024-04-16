<script setup lang="ts">
import { metadataRoutes } from '@/router/RoutesConfig'
import AvatarDefault from '@/assets/user-icon.jpg'
import Logo from '@/assets/logo.png'

// Icons
import { Home } from 'lucide-vue-next'
import { BadgeInfo } from 'lucide-vue-next'
import { ChevronDown } from 'lucide-vue-next'

// Components shadcn-vue
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
</script>
<template>
  <nav class="flex px-6 py-2 justify-between bg-secondary">
    <header>
      <RouterLink :to="metadataRoutes.HOME.path">
        <img class="max-h-20" :src="Logo" alt="quackhub-logo" />
      </RouterLink>
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

      <Separator orientation="vertical" class="w-1" />

      <RouterLink
        class="flex flex-col justify-center items-center gap-1 hover:text-blue-500"
        :to="metadataRoutes.USER_PROFILE.path"
      >
        <Avatar>
          <AvatarImage src="umaurlai" alt="user-avatar" />
          <AvatarFallback>
            <img :src="AvatarDefault" alt="user-avatar-default" />
          </AvatarFallback>
        </Avatar>
        <div class="md:block hidden">
          <span class="text-sm">Eu</span>
          <ChevronDown class="inline-block" :size="22" />
        </div>
      </RouterLink>
    </div>
  </nav>
</template>
<style></style>
