<script setup lang="ts">
import type { IProjectEntity, StateProject } from '@/entites/IProject'

// Shadcn-vue components
import { Button } from './ui/button'
import { Badge } from '@/components/ui/badge'
import Separator from './ui/separator/Separator.vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

// Icons
import {} from 'lucide-vue-next'

// Services
import { projectService } from '@/services'

// Vue imports
import { onMounted, ref } from 'vue'

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

const projects = ref<IProjectEntity[]>([])

onMounted(async () => {
  const res = await projectService.search()

  projects.value = res
})

const badgeColors: Record<StateProject, String> = {
  IDLE: 'bg-blue-500',
  PROGRESS: 'bg-green-500',
  COMPLETED: 'bg-purple-500',
  CANCELLED: 'bg-red-500'
}

const goal = ref(350)

type Data = (typeof data)[number]
const data = [
  { goal: 400 },
  { goal: 300 },
  { goal: 200 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 239 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 349 }
]
</script>

<template>
  <div class="w-full p-5">
    <Button type="button" variant="default"> Adicionar projeto </Button>

    <div class="mt-6 flex flex-col space-y-5">
      <article class="flex flex-col space-y-2" v-for="project in projects">
        <Separator class="h-[1px] bg-white mb-2" />

        <header class="flex items-center space-x-2">
          <span class="font-bold text-2xl">{{ project.title }}</span>
          <Badge variant="secondary" class="tracking-wide">{{ project.state }}</Badge>
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
            <Button variant="outline" class="self-start">Vagas</Button>
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
                  <span class="text-xl font-bold">
                    {{ vacancy.title }}
                  </span>
                  <span class="mb-auto">
                    {{ vacancy.description }}
                  </span>
                  <Badge variant="default" class="tracking-wide">{{ vacancy.state }}</Badge>
                </div>

                <Alert v-else>
                  <Terminal className="h-4 w-4" />
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
    </div>
  </div>
</template>
<style scoped></style>
