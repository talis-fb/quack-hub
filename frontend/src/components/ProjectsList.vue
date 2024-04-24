<script setup lang="ts">
// Utils
import { vacancyLabelState, projectStateLabel } from '@/utils/labels'

import type { IProjectEntity, StateProject } from '@/entites/IProject'

// Shadcn-vue components
import { Button } from './ui/button'
import { Badge } from '@/components/ui/badge'
import Separator from './ui/separator/Separator.vue'
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

// Icons
import {} from 'lucide-vue-next'

// Services
import { projectService } from '@/services'

// Vue imports
import { onMounted, ref } from 'vue'
import type { StateVacancy } from '@/entites/IVacancy'

const projects = ref<IProjectEntity[]>([])

const res = await projectService.search()
projects.value = res
</script>

<template>
  <article class="flex flex-col space-y-2" v-for="project in projects">
    <Separator class="h-[1px]mb-2" />

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
        <Button variant="outline" class="self-start">
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

          <div class="overflow-auto p-4 flex gap-3">
            <div
              v-if="project.vacancies.length"
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

          <DrawerFooter>
            <DrawerClose as-child>
              <Button variant="outline"> Fechar </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  </article>
</template>

<style scoped></style>
