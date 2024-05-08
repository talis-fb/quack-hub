<script setup lang="ts">
// Images
import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg'
import Logo from '@/assets/logo.png'

// Configs
import { metadataRoutes } from '@/router/RoutesConfig'

// Icons
import { Home, BadgeInfo, ChevronDown, LogOut, Search } from 'lucide-vue-next'

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

import { Input } from '@/components/ui/input'
import { useDebounceFn } from '@vueuse/core'
import { userService } from '@/services'
import { type IUserEntity } from '../entites/IUser'
import { ref, watchEffect } from 'vue'

const showSuggestions = ref<boolean>(false)

const inputSearch = ref<HTMLInputElement | null>(null)

const search = ref<string>('')

const users = ref<IUserEntity[]>([])

const findUsersByName = useDebounceFn(async (name?: string) => {
  const res = await userService.search(name)

  users.value = res
}, 500)

function toggleSugestion(event: MouseEvent) {
  showSuggestions.value = !showSuggestions.value
}

watchEffect(async () => {
  await findUsersByName(search.value)
})
</script>
<template>
  <nav
    class="sticky top-0 bg-black/70 backdrop-blur-sm z-20 flex px-6 py-2 justify-between items-center border"
  >
    <header>
      <RouterLink :to="metadataRoutes.HOME.path">
        <img class="max-h-20" :src="Logo" alt="quackhub-logo" />
      </RouterLink>
    </header>

    <div class="relative">
      <Input
        class="pl-10 bg-muted"
        placeholder="Pesquisar no Quackhub"
        ref="inputSearch"
        v-model="search"
        @focus="toggleSugestion"
        @blur="toggleSugestion"
      />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-6 text-muted-foreground" />
      </span>
      <div v-if="showSuggestions" class="bg-black absolute border w-full">
        <div
          v-if="users.length"
          class="cursor-pointer p-3 hover:bg-muted"
          v-for="user in users"
          @mousedown="
            (e) => router.push({ name: metadataRoutes.USER_PROFILE.name, params: { id: user.id } })
          "
        >
          {{ user.name }}
        </div>
        <div class="p-3" v-else>
          <p>Nenhum usuário encontrado</p>
        </div>
      </div>
    </div>

    <div class="flex items-center md:gap-4 gap-8 text-white/70">
      <RouterLink class="flex gap-2 text-lg hover:text-white" :to="metadataRoutes.HOME.path">
        <Home />
        <p class="md:block hidden">Home</p>
      </RouterLink>

      <RouterLink class="flex gap-2 text-lg hover:text-white" :to="metadataRoutes.ABOUT.path">
        <BadgeInfo />
        <p class="md:block hidden">About</p>
      </RouterLink>

      <RouterLink
        class="flex flex-col justify-center gap-1 hover:text-white"
        :to="{ name: metadataRoutes.USER_PROFILE.name, params: { id } }"
      >
        <Avatar>
          <AvatarImage src="umaurlai" alt="user-avatar" />
          <AvatarFallback>
            <img :src="DefaultUserIcon" alt="user-avatar-default" />
          </AvatarFallback>
        </Avatar>
        <div class="md:block hidden">
          <span class="text-sm">Eu</span>
          <ChevronDown class="inline-block" :size="22" />
        </div>
      </RouterLink>

      <a href="#" class="flex gap-2 text-lg text-white/70 hover:text-white" @click="handleLogout">
        <LogOut />
        <span class="md:block hidden">Sair</span>
      </a>
    </div>
  </nav>
</template>
<style></style>
