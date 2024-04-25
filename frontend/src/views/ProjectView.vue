<script setup lang="ts">
import { vacancyLabelState, projectStateLabel } from '@/utils/labels'

import type { IProjectEntity } from '@/entites/IProject'

import { projectService } from '@/services'
import { onMounted, ref } from 'vue'

// Icons
import { Plus, Pencil } from 'lucide-vue-next'

// Images
import UserPhotoDefault from '@/assets/user-icon.jpg'

// App components
import AppDialog from '@/components/AppDialog.vue'

// Shadcn-vue components
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
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

export interface IProjectViewProps {
  id: string
}

const props = defineProps<IProjectViewProps>()

const project = ref<IProjectEntity | null>(null)

onMounted(async () => {
  project.value = await projectService.getProjectById(+props.id)
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

            <div class="flex-1 flex justify-end">
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
          <AppDialog>
            <template #trigger>
              <Button variant="outline" size="icon">
                <Plus class="w-5 h-5" />
              </Button>
            </template>
            <template #title> Adicionar vaga </template>
            <template #description>
              Adicione vagas do projeto para que outros usuários possam ver e se interessar.
            </template>
            <template #main> </template>
          </AppDialog>
        </header>
        <Suspense>
          <div class="p-4 flex flex-wrap gap-3">
            <div
              v-if="project?.vacancies.length"
              v-for="vacancy in project.vacancies"
              class="p-4 flex flex-col border rounded-md gap-2"
            >
              <span class="text-2xl font-bold">
                {{ vacancy.title }}
              </span>
              <span>
                {{ vacancy.description }}
              </span>
              <Badge variant="default" class="tracking-wide mt-auto">{{
                vacancyLabelState[vacancy.state]
              }}</Badge>
            </div>

            <Alert v-else>
              <AlertTitle>Projetos sem vagas abertas</AlertTitle>
              <AlertDescription> Fique ligado para as próximas vagas! </AlertDescription>
            </Alert>
          </div>
          <template #fallback> </template>
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
