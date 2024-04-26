<script setup lang="ts">
import { computed, onMounted, provide } from 'vue'

// Icons
import { Plus, Pencil } from 'lucide-vue-next'

// Images
import UserPhotoDefault from '@/assets/user-icon.jpg'

// App components
import AppDialog from '@/components/AppDialog.vue'
import VacancyForm, { type IVacancyFormData } from '@/components/VacancyForm.vue'
import VacanciesList from '@/components/VacanciesList.vue'
import VacanciesListFallback from '@/components/VacanciesListFallback.vue'

// Shadcn-vue components
import { useToast } from '@/components/ui/toast/use-toast'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

import { useProjectStore } from '@/stores/project'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export interface IProjectViewProps {
  id: string
}

const { toast } = useToast()

const authStore = useAuthStore()
const projectStore = useProjectStore()

const { project } = storeToRefs(projectStore)
const { user } = storeToRefs(authStore)

const props = defineProps<IProjectViewProps>()

const hasPermissions = computed(() => {
  return user.value.id == project.value?.userId
})

provide('hasPermissions', hasPermissions)

const handleSubmitVacancy = async (values: IVacancyFormData) => {
  try {
    await projectStore.createVacancy({ ...values, projectId: +props.id })

    toast({
      title: `Vaga`,
      description: 'Vaga cadastrada com sucesso!',
      variant: 'default',
      duration: 1000
    })
  } catch (error: any) {
    toast({
      title: 'Erro ao criar a vaga',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
}

onMounted(async () => {
  projectStore.getProject(+props.id)
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
              :src="UserPhotoDefault"
              alt="user-icon"
            />

            <div v-if="hasPermissions" class="flex-1 flex justify-end">
              <Sheet>
                <SheetTrigger as-child>
                  <Button variant="outline" size="icon">
                    <Pencil class="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent class="overflow-auto">
                  <SheetHeader>
                    <SheetTitle>Editar perfil</SheetTitle>
                    <SheetDescription>
                      Faça alterações em seu perfil aqui. Clique em salvar mudanças quando terminar.
                    </SheetDescription>
                  </SheetHeader>

                  <!-- <ProfileEdit :user="user as IUserEntity" /> -->
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div class="mt-2">
            <p class="text-2xl">{{ project?.title }}</p>
            <p class="text-muted-foreground">{{ project?.summary }}</p>
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-3 px-3 py-5 border rounded-md">
        <div>
          <h2 class="text-2xl">Sobre</h2>
          <p>{{ project?.about }}</p>
        </div>
      </section>

      <section class="flex flex-col gap-3 px-3 py-5 border rounded-md">
        <header class="flex items-center">
          <h2 class="text-2xl mr-auto">Pessoas que trabalham</h2>
        </header>

        <Suspense>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere quasi dolorum molestias
          voluptas quo est hic, quam voluptatum ad ex et accusantium tempore enim blanditiis fugit
          eum amet rerum rem!
          <template #fallback> </template>
        </Suspense>
      </section>

      <section class="flex flex-col gap-3 px-3 py-5 border rounded-md">
        <header class="flex items-center">
          <h2 class="text-2xl mr-auto">Vagas</h2>
          <AppDialog v-if="hasPermissions">
            <template #trigger>
              <Button variant="outline" size="icon">
                <Plus class="w-5 h-5" />
              </Button>
            </template>
            <template #title> Adicionar vaga </template>
            <template #description>
              Adicione vagas do projeto para que outros usuários possam ver e se interessar.
            </template>
            <template #main>
              <VacancyForm :handle-submit="handleSubmitVacancy" />
            </template>
          </AppDialog>
        </header>
        <Suspense>
          <div class="p-4 flex flex-wrap gap-3">
            <VacanciesList :project-id="+props.id" />
          </div>

          <template #fallback>
            <div class="p-4 flex flex-wrap gap-3">
              <VacanciesListFallback :length="5" />
            </div>
          </template>
        </Suspense>
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

<style scoped></style>
