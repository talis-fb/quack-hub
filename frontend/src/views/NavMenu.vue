<script setup lang="ts">
// Images
import AvatarDefault from '@/assets/user-icon.jpg'
import Logo from '@/assets/logo.png'

// Configs
import { metadataRoutes } from '@/router/RoutesConfig'

// Icons
import { Home, BadgeInfo, ChevronDown, LogOut } from 'lucide-vue-next'

// Components shadcn-vue
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Vue Hooks
import { useRouter } from 'vue-router'

// Store pinia
import { useAuthStore } from '@/stores/auth'

const router = useRouter()

const handleLogout = (e: MouseEvent) => {
  logout()

  router.push({ name: metadataRoutes.SIGNIN.name })
}

const {
  logout,
  user: { id }
} = useAuthStore()
</script>
<template>
  <nav class="flex px-6 py-2 justify-between bg-secondary">
    <header>
      <RouterLink :to="metadataRoutes.HOME.path">
        <img class="max-h-20" :src="Logo" alt="quackhub-logo" />
      </RouterLink>
    </header>

    <div class="flex items-center md:gap-4 gap-8">
      <RouterLink class="flex gap-2 text-lg text-white/70 hover:text-white" :to="metadataRoutes.HOME.path">
        <Home />
        <p class="md:block hidden">Home</p>
      </RouterLink>

      <RouterLink class="flex gap-2 text-lg text-white/70 hover:text-white" :to="metadataRoutes.ABOUT.path">
        <BadgeInfo />
        <p class="md:block hidden">About</p>
      </RouterLink>

      <a href="#" class="flex gap-2 text-lg text-white/70 hover:text-white" @click="handleLogout">
        <LogOut />
        <span class="md:block hidden">Sair</span>
      </a>

      <RouterLink
        class="flex flex-col justify-center gap-1 text-white/70 hover:text-white"
        :to="{ name: metadataRoutes.USER_PROFILE.name, params: { id } }"
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
