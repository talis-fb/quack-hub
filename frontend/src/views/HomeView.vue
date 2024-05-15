<script setup lang="ts">
// Images
import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg'

// App components
import NewsList from '@/components/NewsList.vue'
import NewsListFallback from '@/components/NewsListFallback.vue'

// Shadcn-vue components
import Separator from '@/components/ui/separator/Separator.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Icons
import { Presentation, NotebookPen, ChevronDown } from 'lucide-vue-next'

// Pinia store
import { useAuthStore } from '@/stores/auth'

// Vue imports
import { onBeforeMount, ref } from 'vue'

// Types
import type { IUserEntity } from '@/entites/IUser'

// Services
import { newsService, userService } from '@/services'
import { newsApi } from '@/apis'

const authStore = useAuthStore()

const user = ref<IUserEntity | null>(null)

async function fetchUser(userId: number) {
  const res = await userService.getUserById(userId)

  return res
}

onBeforeMount(async () => {
  if (!authStore.user.id) return

  user.value = await fetchUser(authStore.user.id)

  const news = await newsService.getNews()

  console.log({ news })
})
</script>

<template>
  <div class="flex-1 p-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 mt-6 gap-6">
    <aside class="border p-6 flex flex-col items-center gap-4 rounded-md">
      <div class="flex flex-col items-center border-b-2 border-slate-300 text-lg pb-6">
        <Avatar class="w-16 h-16">
          <AvatarImage :src="user?.avatarUrl ?? ''" />

          <AvatarFallback>
            <img :src="DefaultUserIcon" alt="avatar_user" />
          </AvatarFallback>
        </Avatar>

        <p>{{ user?.name }}</p>
      </div>
      <p>Lista de amigos</p>
    </aside>

    <main class="border flex flex-col md:col-span-2 lg:col-span-3 rounded-md">
      <section class="flex justify-between gap-2 text-lg">
        <RouterLink
          v-slot="{ isExactActive }"
          :to="{ name: 'posts' }"
          class="border transition delay-50 p-5 cursor-pointer hover:bg-black/40 flex-1 flex gap-1 items-center justify-center"
        >
          <div
            class="pb-3 flex space-x-1 border-b-2"
            :class="isExactActive ? 'border-primary' : 'border-transparent'"
          >
            <NotebookPen />
            <span>Postagens</span>
          </div>
        </RouterLink>

        <RouterLink
          v-slot="{ isExactActive }"
          :to="{ name: 'projects' }"
          class="border transition delay-50 p-5 cursor-pointer hover:bg-black/40 flex-1 flex gap-1 items-center justify-center"
        >
          <div
            class="pb-3 flex space-x-1 border-b-2"
            :class="isExactActive ? 'border-primary' : 'border-transparent'"
          >
            <Presentation />
            <span>Projetos</span>
          </div>
        </RouterLink>
      </section>

      <Separator />

      <section class="flex-1 flex gap-6 text-lg rounded-lg">
        <RouterView />
      </section>
    </main>

    <aside class="border flex flex-col md:col-start-2 md:col-span-2 lg:col-start-5 rounded-md">
      <article class="text-lg p-3 0 ">
        <h1 class="font-bold text-xl mb-2">QuackHub Notícias</h1>
        
        <Suspense>
          <NewsList />
          <template #fallback>
            <NewsListFallback :length="4" />
          </template>
        </Suspense>

        <!-- <div class="flex items-center">
          <input type="checkbox" id="expandir-mais-home-aside" class="hidden" />
          <label for="expandir-mais-home-aside" class="cursor-pointer flex items-center">
            Expandir mais <ChevronDown class="transition-transform h-6 w-6 transform rotate-0" />
          </label>
        </div> -->
      </article>
    </aside>
  </div>
</template>
<style>
#expandir-mais-home-aside:checked + label .transition-transform {
  @apply transform rotate-180;
}
</style>
