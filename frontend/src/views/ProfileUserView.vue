<script setup lang="ts">
// Images
import WalpaperDefaultUser from '@/assets/wallpaper-default-user.svg'
import UserPhotoDefault from '@/assets/user-icon.jpg'

// App components
import ExperienceForm from '@/components/ExperienceForm.vue'
import AppDialog from '@/components/AppDialog.vue'
import AcademicExperiences from '@/components/AcademicExperiences.vue'
import ProfessionalExperiences from '@/components/ProfessionalExperiences.vue'

import { Button } from '@/components/ui/button'

// Icons
import { Ellipsis, Plus, Pencil } from 'lucide-vue-next'
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import { userService } from '@/services'
import type { IUserResponse } from '@/apis/auth/models/IUserResponse'

/**
 * Recebendo o userId pelo param da rota.
 */
const props = defineProps({
  id: String
})

const user = ref<IUserResponse | null>(null)

onBeforeMount(async () => {
  const res = await userService.getUserById((props as any).id as number)

  user.value = res
})
</script>
<template>
  <main class="flex flex-1 flex-col md:flex-row p-3 gap-5">
    <section class="flex-1 flex flex-col gap-5 relative rounded-md">
      <section class="bg-secondary rounded-md">
        <figure>
          <img class="w-full h-[200px] object-cover" :src="WalpaperDefaultUser" alt="" />
        </figure>

        <figure class="ml-6 mt-3 absolute top-28 flex flex-col items-center justify-center">
          <img class="max-h-36 rounded-full" :src="UserPhotoDefault" alt="user-icon" />
          <figcaption class="text-lg">{{ user?.name }}</figcaption>
        </figure>

        <button class="absolute right-5">
          <Ellipsis />
        </button>

        <div class="min-h-36 mt-32 pl-6">
          <p>Informações de contato</p>
          <p class="mt-6"><span>Seguidores</span> | <span>Seguindo</span></p>
        </div>
      </section>

      <section class="flex flex-col gap-3 px-3 py-5 bg-secondary rounded-md">
        <AcademicExperiences v-if="user" :user-id="user.id" />
      </section>

      <section class="flex flex-col gap-3 px-3 py-5 bg-secondary rounded-md">
        <ProfessionalExperiences v-if="user" :user-id="user.id" />
      </section>

      <section class="flex flex-col gap-3 px-3 py-5 bg-secondary rounded-md">
        <div>
          <h2 class="text-2xl">Sobre</h2>
          <p>{{ user?.aboutDescription }}</p>
        </div>
      </section>
    </section>

    <aside class="flex flex-col gap-6 p-3 bg-secondary rounded-md">
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
