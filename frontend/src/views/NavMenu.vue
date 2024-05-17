<script setup lang="ts">
// Images
import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg'
import Logo from '@/assets/logo.png'

// Configs
import { metadataRoutes } from '@/router/RoutesConfig'

// Icons
import { Home, BadgeInfo, ChevronDown, LogOut, BookText } from 'lucide-vue-next'

// Types
import { type IUserEntity } from '../entites/IUser'

// Vue imports
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

// Shadcn-vue components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Vueuse
import { useDebounceFn } from '@vueuse/core'

// App components
import InputSearch from '@/components/InputSearch.vue'

// Services
import { userService } from '@/services'

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

const usernameSearch = ref<string>('')

const users = ref<IUserEntity[]>([])

const findUsersByName = useDebounceFn(async (name?: string) => {
  const res = await userService.search(name)

  users.value = res
}, 500)

function navigateToUserProfile(id: number) {
  router.push({ name: metadataRoutes.USER_PROFILE.name, params: { id } })
}

watchEffect(async () => {
  await findUsersByName(usernameSearch.value)
})
</script>
<template>
  <nav
    class="sticky top-0 bg-black/70 backdrop-blur-sm z-20 flex items-center space-x-5 px-3 py-2 border"
  >
    <header class="flex items-center mr-auto">
      <!-- <RouterLink v-if="!(focusedInputSearch || focusedButtonOpen)" :to="metadataRoutes.HOME.path">
        <img class="minu-20 max-h-20" :src="Logo" alt="quackhub-logo" />
      </RouterLink> -->

      <RouterLink :to="metadataRoutes.HOME.path">
        <img class="minu-20 max-h-20" :src="Logo" alt="quackhub-logo" />
      </RouterLink>

      <InputSearch v-model:search="usernameSearch">
        <template #suggestions>
          <ul v-if="users.length">
            <li
              class="cursor-pointer flex items-center space-x-2 p-3 hover:bg-muted"
              @mousedown="() => navigateToUserProfile(user.id)"
              v-for="user in users"
            >
              <Avatar class="w-10 h-10">
                <AvatarImage :src="user.avatarUrl ?? ''" />

                <AvatarFallback>
                  <img :src="DefaultUserIcon" alt="avatar_user" />
                </AvatarFallback>
              </Avatar>
              <span>{{ user.name }}</span>
            </li>
          </ul>

          <div class="p-3" v-else>
            <p>Nenhum usuário encontrado</p>
          </div>
        </template>
      </InputSearch>
    </header>

    <ul class="flex items-center md:gap-4 gap-8 text-white/70">
      <li>
        <RouterLink class="flex gap-2 text-lg hover:text-white" :to="metadataRoutes.HOME.path">
          <Home />
          <p class="md:block hidden">Home</p>
        </RouterLink>
      </li>

      <li>
        <RouterLink
          class="flex gap-2 text-lg hover:text-white"
          :to="metadataRoutes.ANNOUNCEMENT.path"
        >
          <BookText />
          <p class="md:block hidden">Editais</p>
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
<style scoped></style>
