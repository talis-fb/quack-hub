<script setup lang="ts">
// Images
import DefaultProjectIcon from '@/assets/DefaultProjectIcon.jpg'

// Utils
import { projectStateLabel } from '@/utils/labels'

// Types
import type { IInputProjectData, IProjectEntity } from '@/entites/IProject'

// App components
import AppDialog from '@/components/AppDialog.vue'
import AppAlertDialog from '@/components/AppAlertDialog.vue'
import ProjectForm from '@/components/ProjectForm.vue'
import VacanciesListFallback from '@/components/VacanciesListFallback.vue'
import MethodologieItem from '@/components/MethodologieItem.vue'
import VacanciesList from './VacanciesList.vue'

// Shadcn-vue components
import { Button } from './ui/button'
import { Badge } from '@/components/ui/badge'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Routes config
import { metadataRoutes } from '../router/RoutesConfig'

// Icons
import { Pencil, Trash } from 'lucide-vue-next'

// Store pinia
import { useProjectsStore } from '@/stores/projects'

// Vue imports
import { inject } from 'vue'
import { useRouter } from 'vue-router'

export interface ProjectItemProps {
  project: IProjectEntity
}

/**
 * @type {boolean}
 * @description Check if project owner is the same as the authenticated user
 * @description This is captured in the UserProfileView component
 
 */
const hasPermissions = inject('hasPermissions', false)

const projecstStore = useProjectsStore()
const router = useRouter()

const props = defineProps<ProjectItemProps>()

const { toast } = useToast()

const handleUpdateProject = async (values: IInputProjectData) => {
  try {
    await projecstStore.updateProject(props.project.id, {
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
    await projecstStore.deleteProject(props.project.id)

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
    class="group relative cursor-pointer hover:bg-black/40 flex flex-col rounded-sm"
    @click="toProject"
  >
    <div class="px-4 py-3 flex">
      <Avatar class="mr-2 size-20">
        <AvatarImage :src="props.project.logoUrl || ''" />

        <AvatarFallback>
          <img :src="DefaultProjectIcon" alt="project-logo" />
        </AvatarFallback>
      </Avatar>

      <div class="flex-1 flex flex-col space-y-3">
        <div class="flex space-x-1">
          <span class="font-bold text-2xl mr-2">{{ project.title }}</span>

          <Badge variant="secondary" class="tracking-wide">{{
            projectStateLabel[project.state]
          }}</Badge>
          <Badge variant="secondary" class="tracking-wide">{{ project.sector }}</Badge>
        </div>

        <p class="text-sm text-muted-foreground">{{ project.summary }}</p>

        <div class="flex flex-wrap max-w-[75%] gap-2">
          <MethodologieItem v-for="methodologie in project.methodologies" :methodologie="methodologie" />
        </div>

        <Drawer>
          <DrawerTrigger as-child>
            <Button variant="outline" class="self-start" @click.stop="">
              <!-- TODO: Ver como carregar a quantidade de vagas. Criar um componente pra esse botão de vagas é uma possibilidade. -->
              <!-- <span class="font-bold underline mr-1">{{ 0 }}</span> -->
              Vagas
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div class="h-max-[500px]">
              <DrawerHeader>
                <DrawerTitle>Vagas para {{ props.project.title }}</DrawerTitle>
                <DrawerDescription>Visualize as vagas e participe do projeto!</DrawerDescription>
              </DrawerHeader>

              <Suspense>
                <div class="overflow-auto p-4 flex gap-3">
                  <VacanciesList :project-id="props.project.id" />
                </div>
                <template #fallback>
                  <div class="overflow-auto p-4 flex gap-3">
                    <VacanciesListFallback :length="8" />
                  </div>
                </template>
              </Suspense>

              <DrawerFooter>
                <DrawerClose as-child>
                  <Button variant="outline"> Fechar </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>

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
        <template #title> Editar Projeto '{{ props.project.title }}' </template>
        <template #description>
          Edite seu projeto para que outras pessoas possam visualizar.
        </template>
        <template #main>
          <div class="h-[600px]">
            <ProjectForm
              :project="props.project"
              :handle-submit="handleUpdateProject"
              :clear-form-after-submit="false"
            />
          </div>
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
