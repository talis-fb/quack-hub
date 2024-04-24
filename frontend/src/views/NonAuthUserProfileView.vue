<script setup lang="ts">
// Vue imports
import { Suspense, onBeforeMount, ref, computed } from 'vue';

// Services
import { userService } from '@/services'

// Images

import UserPhotoDefault from '@/assets/user-icon.jpg'

// App components
import ExperiencesList from '@/components/ExperiencesList.vue'
import ExperienceListFallback from '@/components/ExperienceListFallback.vue'

// Shadcn-vue components

// Icons

// Types
import type { IUserEntity } from '@/entites/IUser'

/**
 * Recebendo o userId pelo param da rota.
 */
const props = defineProps<{
  id: string
}>()

const user = ref<IUserEntity | null>(null)

const userPhoto = computed(() => {
  if (user.value?.avatarUrl) {
    return user.value.avatarUrl
  }

  return UserPhotoDefault
})

onBeforeMount(async () => {
  const res = await userService.getUserById((props as any).id as number)

  user.value = res
})


</script>
<template>
  <main class="flex flex-1 flex-col md:flex-row p-3 gap-5">
    <section class="flex-1 flex flex-col gap-5 relative rounded-md">
      <section class="border rounded-md">
        <div class="bg-default-walpaper h-[200px]"></div>

        <div class="p-5">
          <div class="flex">
            <img
              class="mt-[-60px] w-32 rounded-full border-4 border-black"
              :src="userPhoto"
              alt="user-icon"
            />
          </div>

          <p class="text-lg">{{ user?.name }}</p>
          <p>Informações de contato</p>
          <p class="mt-6">
            <span class="text-xl font-bold">{{ user?.followedBy }}</span> Seguidores |
            <span class="text-xl font-bold">{{ user?.following }}</span>
            Seguindo
          </p>
        </div>
      </section>

      <section class="flex flex-col gap-3 px-3 py-5 border rounded-md">
        <header class="flex items-center">
          <h2 class="text-2xl mr-auto">Experiências acadêmicas</h2>
        </header>

        <Suspense>
          <ExperiencesList :user-id="+props.id" type="ACADEMIC" />
          <template #fallback>
            <ExperienceListFallback :length="3" />
          </template>
        </Suspense>
      </section>

      <section class="flex flex-col gap-3 px-3 py-5 border rounded-md">
        <header class="flex items-center">
          <h2 class="text-2xl mr-auto">Experiências profissionais</h2>
        </header>

        <Suspense>
          <ExperiencesList :user-id="+props.id" type="PROFESSIONAL" />

          <template #fallback>
            <ExperienceListFallback :length="3" />
          </template>
        </Suspense>
      </section>

      <section class="flex flex-col gap-3 px-3 py-5 border rounded-md">
        <div>
          <h2 class="text-2xl">Sobre</h2>
          <p>{{ user?.aboutDescription }}</p>
        </div>
      </section>
    </section>

    <aside class="flex flex-col gap-6 p-3 border rounded-md">
      <section>
        <h2 class="text-2xl">As pessoas também visualizam</h2>
        <p>Coisas que as pessoas vizualizam aqui</p>
      </section>
      <section>
        <h2 class="text-2xl">Projetos em destaque</h2>
        <p>A listagem dos projetos em destaque aqui</p>
      </section>
    </aside>
  </main>
</template>

<style></style>
