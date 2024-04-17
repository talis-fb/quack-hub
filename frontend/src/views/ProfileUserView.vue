<script setup lang="ts">
// Services
import { userService, experienceService } from '@/services'

// Images
import WalpaperDefaultUser from '@/assets/wallpaper-default-user.svg'
import UserPhotoDefault from '@/assets/user-icon.jpg'

// App components
import ExperienceForm from '@/components/ExperienceForm.vue'
import AppDialog from '@/components/AppDialog.vue'
import ExperiencesList from '@/components/ExperiencesList.vue'

// Shadcn-vue components
import { useToast } from '@/components/ui/toast/use-toast'
import { Button } from '@/components/ui/button'

// Icons
import { Ellipsis, Plus, Pencil, Info } from 'lucide-vue-next'
import { onBeforeMount, ref } from 'vue'
import type { IUserResponse } from '@/apis/auth/models/IUserResponse'

// Types
import { type ExperienceDataForm } from '@/components/ExperienceForm.vue'

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

const { toast, dismiss } = useToast()

const handleSubmit = async (values: ExperienceDataForm) => {
  try {
    await experienceService.create({
      ...values,
      userId: (props as any).id
    })

    toast({
      title: `Experiência ${values.type == 'ACADEMIC' ? 'acadêmica' : 'profissional'}`,
      description: 'Experiência cadastrada com sucesso!',
      variant: 'default',
      duration: 1000
    })
  } catch (error: any) {
    toast({
      title: 'Erro ao criar a experiência',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
}
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
        <header class="flex items-center">
          <h2 class="text-2xl mr-auto">Experiências acadêmicas</h2>

          <AppDialog>
            <template #trigger>
              <Button variant="outline" size="icon" class="bg-transparent hover:bg-black/40">
                <Plus class="w-5 h-5" />
              </Button>
            </template>
            <template #title> Adicionar experiência acadêmica </template>
            <template #description>
              Adicione suas experiências acadêmicas para que outros usuários possam ver seu perfil
              acadêmico.
            </template>
            <template #main>
              <ExperienceForm
                :handle-submit="handleSubmit"
                title-label="Instituição de ensino"
                title-placeholder="Ex.: UFRN"
                type="ACADEMIC"
              />
            </template>
          </AppDialog>

          <Button variant="outline" size="icon" class="bg-transparent hover:bg-black/40">
            <Pencil class="w-5 h-5" />
          </Button>
        </header>

        <ExperiencesList v-if="user" :user-id="user.id" type="ACADEMIC" />
      </section>

      <section class="flex flex-col gap-3 px-3 py-5 bg-secondary rounded-md">
        <header class="flex items-center">
          <h2 class="text-2xl mr-auto">Experiências profissionais</h2>

          <AppDialog>
            <template #trigger>
              <Button variant="outline" size="icon" class="bg-transparent hover:bg-black/40">
                <Plus class="w-5 h-5" />
              </Button>
            </template>
            <template #title> Adicionar experiência profissional </template>
            <template #description>
              Adicione suas experiências profissionais para que outros usuários possam ver seu
              perfil profissional.
            </template>
            <template #main>
              <ExperienceForm
                :handle-submit="handleSubmit"
                title-label="Título"
                title-placeholder="Ex.: Desenvolvedor Backend"
                type="PROFESSIONAL"
              />
            </template>
          </AppDialog>

          <Button variant="outline" size="icon" class="bg-transparent hover:bg-black/40">
            <Pencil class="w-5 h-5" />
          </Button>
        </header>

        <ExperiencesList v-if="user" :user-id="user.id" type="PROFESSIONAL" />
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
