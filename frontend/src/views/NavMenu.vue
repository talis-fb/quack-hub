<script setup lang="ts">
// Images
import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg'
import Logo from '@/assets/logo.png'

// Configs
import { metadataRoutes } from '@/router/RoutesConfig'

// Icons
import { Home, BadgeInfo, ChevronDown, LogOut, Search as SearchIcon } from 'lucide-vue-next'

// Shadcn-vue components
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

const username = ref<string>('')

const users = ref<IUserEntity[]>([])

const findUsersByName = useDebounceFn(async (name?: string) => {
  const res = await userService.search(name)

  users.value = res
}, 500)

function toggleSugestion(_: MouseEvent) {
  showSuggestions.value = !showSuggestions.value
}

function navigateToUserProfile(id: number) {
  console.log({ id })
  router.push({ name: metadataRoutes.USER_PROFILE.name, params: { id } })
}

watchEffect(async () => {
  await findUsersByName(username.value)
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

    <search class="relative">
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <SearchIcon class="size-6 text-muted-foreground" />
      </span>

      <Input
        class="pl-10 bg-muted"
        placeholder="Pesquisar no Quackhub"
        ref="inputSearch"
        v-model="username"
        @focus="toggleSugestion"
        @blur="toggleSugestion"
      />

      <section v-if="showSuggestions" class="bg-black absolute border w-full">
        <ul v-if="users.length">
          <li
            class="flex items-center space-x-2 cursor-pointer p-3 hover:bg-muted"
            v-for="user in users"
            @mousedown="(e) => navigateToUserProfile(user.id)"
          >
            <Avatar class="w-10 h-10">
              <AvatarImage :src="user.avatarUrl ?? ''" />

              <AvatarFallback>
                <img :src="DefaultUserIcon" alt="avatar_user" />
              </AvatarFallback>
            </Avatar>
            <span>
              {{ user.name }}
            </span>
          </li>
        </ul>

        <div class="p-3" v-else>
          <p>Nenhum usuário encontrado</p>
        </div>
      </section>
    </search>

    <ul class="flex items-center md:gap-4 gap-8 text-white/70">
      <li>
        <RouterLink class="flex gap-2 text-lg hover:text-white" :to="metadataRoutes.HOME.path">
          <Home />
          <p class="md:block hidden">Home</p>
        </RouterLink>
      </li>

      <li>
        <RouterLink class="flex gap-2 text-lg hover:text-white" :to="metadataRoutes.ABOUT.path">
          <BadgeInfo />
          <p class="md:block hidden">About</p>
        </RouterLink>
      </li>

      <li>
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
      </li>

      <li>
        <a href="#" class="flex gap-2 text-lg text-white/70 hover:text-white" @click="handleLogout">
          <LogOut />
          <span class="md:block hidden">Sair</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<style></style>
