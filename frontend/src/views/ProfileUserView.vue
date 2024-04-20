<script setup lang="ts">
// Vue imports
import { Suspense, onBeforeMount, ref } from 'vue'

// Services
import { userService, experienceService } from '@/services'

// Images
import WalpaperDefaultUser from '@/assets/wallpaper-default-user.svg'
import UserPhotoDefault from '@/assets/user-icon.jpg'

// App components
import ExperienceForm from '@/components/ExperienceForm.vue'
import AppDialog from '@/components/AppDialog.vue'
import ExperiencesList from '@/components/ExperiencesList.vue'
import ExperienceListFallback from '@/components/ExperienceListFallback.vue'

// Shadcn-vue components
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/toast/use-toast'
import { Button } from '@/components/ui/button'

// Icons
import { Ellipsis, Plus, Pencil, Info } from 'lucide-vue-next'

// Types
import { type ExperienceDataForm } from '@/components/ExperienceForm.vue'
import { useExperienceStore } from '@/stores/experience'
import type { IUserEntity } from '@/entites/IUser'

const experienceStore = useExperienceStore()

/**
 * Recebendo o userId pelo param da rota.
 */
const props = defineProps<{
  id: string
}>()

const user = ref<IUserEntity | null>(null)

onBeforeMount(async () => {
  const res = await userService.getUserById((props as any).id as number)

  user.value = res
})

const { toast, dismiss } = useToast()

const handleSubmit = async (values: ExperienceDataForm) => {
  try {
    await experienceStore.createExperience({
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
        <div class="bg-default-walpaper h-[200px]"></div>

        <div class="p-5">
          <div class="flex">
            <img
              class="mt-[-60px] w-32 rounded-full border-4 border-black"
              :src="UserPhotoDefault"
              alt="user-icon"
            />

            <div class="flex-1 flex justify-end">
              <Button variant="outline" size="icon" class="bg-transparent hover:bg-black/40">
                <Pencil class="w-5 h-5" />
              </Button>
            </div>
          </div>

          <figcaption class="text-lg">{{ user?.name }}</figcaption>
          <p>Informações de contato</p>
          <p class="mt-6">
            <span class="text-xl font-bold">{{ user?.followedBy }}</span> Seguidores |
            <span class="text-xl font-bold">{{ user?.following }}</span>
            Seguindo
          </p>
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

        <Suspense>
          <ExperiencesList :user-id="+props.id" type="ACADEMIC" />
          <template #fallback>
            <ExperienceListFallback :length="3" />
          </template>
        </Suspense>
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

        <Suspense>
          <ExperiencesList :user-id="+props.id" type="PROFESSIONAL" />

          <template #fallback>
            <ExperienceListFallback :length="3" />
          </template>
        </Suspense>
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
