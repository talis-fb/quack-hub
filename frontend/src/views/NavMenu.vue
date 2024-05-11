<script setup lang="ts">
// Images
import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg'
import Logo from '@/assets/logo.png'

// Configs
import { metadataRoutes } from '@/router/RoutesConfig'

// Icons
import { Home, BadgeInfo, ChevronDown, LogOut, Search } from 'lucide-vue-next'

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

    <div class="relative" role="search">
      <div class="search-box">
        <button class="btn-search flex items-center justify-center">
          <Search class="size-6" />
        </button>
        <Input
          class="input-search"
          placeholder="Pesquisar no Quackhub"
          ref="inputSearch"
          v-model="username"
          @focus="toggleSugestion"
          @blur="toggleSugestion"
        />
      </div>

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
    </div>

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
<style>
.search-box {
  width: fit-content;
  height: fit-content;
  position: relative;
}

.input-search {
  height: 50px;
  width: 50px;
  background-color: hsl(var(--muted));
  border-style: none;
  padding: 10px;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 25px;
  transition: all .5s ease-in-out;
  padding-right: 40px;
  color: #fff;
}

.input-search::placeholder {
  color: rgba(255,255,255,.5);
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: 100;
}

.btn-search {
  width: 50px;
  height: 50px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  color: #ffffff;
  pointer-events: painted;
}

.btn-search:focus ~ .input-search {
  width: 300px;
  background-color: hsl(var(--muted));
  border-radius: 1.3rem;
  background-color: transparent;
  transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}

.input-search:focus {
  width: 300px;
  border-radius: 1.3rem;
  background-color: hsl(var(--muted));
  border-bottom: 1px solid rgba(255,255,255,.5);
  transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}
</style>
