<script setup lang="ts">
// Utils
import { vacancyLabelState, projectStateLabel } from '@/utils/labels'

// Types
import type { IProjectEntity } from '@/entites/IProject'
import type { IUpdateProject } from '@/apis/project/types/IUpdateProject'

// App components
import AppDialog from '@/components/AppDialog.vue'
import AppAlertDialog from '@/components/AppAlertDialog.vue'
import ProjectForm from '@/components/ProjectForm.vue'
import VacancyBox from '@/components/VacancyBox.vue'

// Shadcn-vue components
import { Button } from './ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { useToast } from '@/components/ui/toast'

// Icons
import { Pencil, Trash } from 'lucide-vue-next'

// Store pinia
import { useProjectsStore } from '@/stores/projects'
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { metadataRoutes } from '../router/RoutesConfig'

export interface ProjectItemProps {
  project: IProjectEntity
}

/**
 * O provedor desse inject ẽ um componente pai. No caso o componente AuthUserProfileView ou NonAuthUserProfileView
 */

const hasPermissions = inject('hasPermissions', false)

const projectStore = useProjectsStore()
const router = useRouter()

const props = defineProps<ProjectItemProps>()

const { toast } = useToast()

const handleUpdateProject = async (values: IUpdateProject) => {
  try {
    await projectStore.updateProject(props.project.id, {
      ...values
    })

    toast({
      title: `Projeto ${props.project.title}`,
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

const handleDeleteProject = async () => {
  try {
    await projectStore.deleteProject(props.project.id)

    toast({
      title: `Projeto`,
      description: 'Projeto deletado com sucesso!',
      variant: 'default',
      duration: 1000
    })
  } catch (error: any) {
    toast({
      title: 'Erro ao deletar a Projeto',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
}

const toProject = (e: MouseEvent) => {
  router.push({ name: metadataRoutes.PROJECT.name, params: { id: props.project.id } })
}
</script>

<template>
  <div
    class="group relative cursor-pointer hover:bg-black/40 px-4 py-3 flex flex-col space-y-2 rounded-sm"
    @click="toProject"
  >
    <header class="flex items-center space-x-2">
      <span class="font-bold text-2xl">{{ project.title }}</span>
      <Badge variant="secondary" class="tracking-wide">{{
        projectStateLabel[project.state]
      }}</Badge>
      <Badge variant="secondary" class="tracking-wide">{{ project.sector }}</Badge>
    </header>

    <p class="text-sm text-muted-foreground">{{ project.summary }}</p>

    <section class="flex flex-wrap space-x-1">
      <Badge variant="secondary" class="tracking-wide" v-for="met in project.methodologies">{{
        met
      }}</Badge>
    </section>

    <Drawer>
      <DrawerTrigger as-child>
        <Button variant="outline" class="self-start" @click.stop="">
          <span class="font-bold underline mr-1">{{ project.vacancies.length }}</span
          >Vagas
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div class="h-max-[500px]">
          <DrawerHeader>
            <DrawerTitle>Vagas</DrawerTitle>
            <DrawerDescription>Visualize as vagas e participe do projeto!</DrawerDescription>
          </DrawerHeader>

          <div class="overflow-auto p-4 flex gap-3" v-if="project?.vacancies.length">
            <VacancyBox v-for="vacancy in project.vacancies" :vacancy="vacancy" />
          </div>
          <Alert v-else>
            <AlertTitle>Projetos sem vagas abertas</AlertTitle>
            <AlertDescription> Fique ligado para as próximas vagas! </AlertDescription>
          </Alert>

          <DrawerFooter>
            <DrawerClose as-child>
              <Button variant="outline"> Fechar </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>

    <div
      v-if="hasPermissions"
      class="hidden group-hover:flex absolute top-1/2 right-2 transform -translate-y-1/2 gap-2"
    >
      <AppDialog>
        <template #trigger>
          <Button variant="default" size="icon" @click.stop="">
            <Pencil class="w-5 h-5" />
          </Button>
        </template>
        <template #title> Editer Projeto '{{ props.project.title }}' </template>
        <template #description>
          Edite seu projeto para que outras pessoas possam visualizar.
        </template>
        <template #main>
          <ProjectForm
            :title="props.project.title"
            :summary="props.project.summary"
            :about="props.project.about"
            :sector="props.project.sector"
            :state="props.project.state"
            :start-date="props.project.startDate"
            :end-date="props.project.endDate"
            :handle-submit="handleUpdateProject"
          />
        </template>
      </AppDialog>

      <AppAlertDialog :handleAction="handleDeleteProject">
        <template #trigger>
          <Button variant="destructive" size="icon" @click.stop="">
            <Trash class="w-5 h-5" />
          </Button>
        </template>

        <template #title>
          <p>Você tem certeza absoluta?</p>
        </template>
        <template #description>
          Essa ação não pode ser desfeita. Isso excluirá sua experência.
        </template>
        <template #action> Continuar </template>
        <template #cancel> Cancelar </template>
      </AppAlertDialog>
    </div>
  </div>
</template>
<style scoped></style>
