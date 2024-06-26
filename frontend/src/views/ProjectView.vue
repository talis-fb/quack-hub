<script setup lang="ts">
// Vue imports
import { computed, onBeforeMount, provide } from 'vue'

// Icons
import { Plus, Pencil } from 'lucide-vue-next'

// Images
import DefaultProjectIcon from '@/assets/DefaultProjectIcon.jpg'

// App components
import AppDialog from '@/components/AppDialog.vue'
import VacancyForm, { type IVacancyFormData } from '@/components/VacancyForm.vue'
import VacanciesList from '@/components/VacanciesList.vue'
import VacanciesListFallback from '@/components/VacanciesListFallback.vue'
import MethodologieItem from '@/components/MethodologieItem.vue'
import ProjectForm from '@/components/ProjectForm.vue'

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
import { Separator } from '@/components/ui/separator'
import { Alert, AlertTitle } from '@/components/ui/alert'

// Pinia Store
import { storeToRefs } from 'pinia'
import { useProjectStore } from '@/stores/project'
import { useAuthStore } from '@/stores/auth'

// Types
import type { IInputProjectData, IProjectEntity } from '@/entites/IProject'
import { projectService } from '@/services'
import { metadataRoutes } from '@/router/RoutesConfig'

export interface IProjectViewProps {
  project: IProjectEntity
}

const props = defineProps<IProjectViewProps>()

const { toast } = useToast()

const authStore = useAuthStore()
const projectStore = useProjectStore()

const { project } = storeToRefs(projectStore)

const { user } = storeToRefs(authStore)

const hasPermissions = computed(() => {
  return user.value.id == project.value?.userId
})

provide('hasPermissions', hasPermissions)

const handleSubmitVacancy = async (values: IVacancyFormData) => {
  try {
    await projectStore.createVacancy({ ...values, projectId: (project.value as IProjectEntity).id })

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

const handleUpdateProject = async (values: IInputProjectData) => {
  try {
    await projectStore.updateProject((project.value as IProjectEntity).id, {
      ...values
    })

    toast({
      title: `Projeto ${(project.value as IProjectEntity).title}`,
      description: 'Projeto atualizada com sucesso!',
      variant: 'default',
      duration: 1000
    })
  } catch (error: any) {
    toast({
      title: 'Erro ao atualizar a Projeto',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
}

const projectLogo = computed(() => {
  if (project.value?.logoUrl) {
    return project.value.logoUrl
  }
  return DefaultProjectIcon
})

onBeforeMount(() => {
  projectStore.setProject(props.project)
})
</script>

<script lang="ts">
export default {
  beforeRouteEnter: async (to, from) => {
    try {
      const res = await projectService.getProjectById(+to.params.id)

      to.params = { ...to.params, project: res as any }
    } catch (error) {
      return {
        name: metadataRoutes.NOT_FOUND.name
      }
    }
  }
}
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
              :src="projectLogo"
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
                      Faça alterações em seu projeto aqui. Clique em salvar mudanças quando
                      terminar.
                    </SheetDescription>
                  </SheetHeader>

                  <ProjectForm
                    :project="project as IProjectEntity"
                    :handle-submit="handleUpdateProject"
                  />
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

      <section class="flex flex-col border rounded-md">
        <div class="px-3 py-5">
          <h2 class="text-2xl">Sobre</h2>
        </div>

        <Separator />

        <div class="px-3 py-5">
          <p>{{ (project as IProjectEntity).about }}</p>
        </div>
      </section>

      <section class="flex flex-col border rounded-md">
        <header class="px-3 py-5 flex items-center">
          <h2 class="text-2xl mr-auto">Metodologias</h2>
        </header>

        <Separator />

        <Suspense>
          <div class="px-3 py-5 flex flex-wrap gap-2">
            <MethodologieItem
              v-if="project?.methodologies.length"
              v-for="methodologie in project?.methodologies"
              :methodologie="methodologie"
            />
            <Alert v-else>
              <AlertTitle>Nenhuma metodologia cadastrada.</AlertTitle>
            </Alert>
          </div>
          <template #fallback> </template>
        </Suspense>
      </section>

      <section class="flex flex-col border rounded-md">
        <header class="px-3 py-5 flex items-center">
          <h2 class="text-2xl mr-auto">Pessoas que trabalham</h2>
        </header>

        <Separator />

        <Suspense>
          <div class="px-3 py-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere quasi dolorum molestias
            voluptas quo est hic, quam voluptatum ad ex et accusantium tempore enim blanditiis fugit
            eum amet rerum rem!
          </div>
          <template #fallback> </template>
        </Suspense>
      </section>

      <section class="flex flex-col border rounded-md">
        <header class="px-3 py-5 flex items-center">
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

        <Separator />

        <Suspense>
          <div class="px-3 py-5 flex flex-wrap gap-3">
            <VacanciesList :project-id="(project as IProjectEntity).id" />
          </div>

          <template #fallback>
            <div class="px-3 py-5 flex flex-wrap gap-3">
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
