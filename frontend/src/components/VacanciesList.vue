<script setup lang="ts">
// types

// Icons
import { MoreHorizontalIcon } from 'lucide-vue-next'

// App components
import AppDialog from '@/components/AppDialog.vue'
import VacancyBox from '@/components/VacancyBox.vue'
import VacancyForm,  { type IVacancyFormData } from '@/components/VacancyForm.vue'

import { storeToRefs } from 'pinia'

// Shadcn-vue components
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useProjectStore } from '@/stores/project'
import { inject } from 'vue'
import { useToast } from './ui/toast'

const { toast } = useToast()

const projectStore = useProjectStore()

const { vacancies } = storeToRefs(projectStore)
export interface VacanciesListProps {
  projectId: number
}

const props = defineProps<VacanciesListProps>()

await projectStore.getVacancies(props.projectId)

const hasPermissions = inject('hasPermissions', false)

const handleUpdateVacancy = async (vacancyId: number, values: IVacancyFormData) => {
  try {
    await projectStore.updateVacancy(vacancyId, { ...values })

    toast({
      title: `Vaga`,
      description: 'Vaga atualizada com sucesso!',
      variant: 'default',
      duration: 1000
    })
  } catch (error: any) {
    toast({
      title: 'Erro ao atualizar a vaga',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
}

const handleDeleteVacancy = async (vacancyId: number) => {
  try {
    await projectStore.deleteVacancy(vacancyId)

    toast({
      title: `Vaga`,
      description: 'Vaga excluída com sucesso!',
      variant: 'default',
      duration: 1000
    })
  } catch (error: any) {
    toast({
      title: 'Erro ao excluir a vaga',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
}
</script>

<template>
  <div class="p-4 flex flex-wrap gap-3" v-if="vacancies.length">
    <VacancyBox v-for="vacancy in vacancies" :vacancy="vacancy">
      <template #actions>
        <Popover v-if="hasPermissions" :modal="true">
          <PopoverTrigger as-child>
            <MoreHorizontalIcon class="cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent class="max-w-[150px] p-0">
            <div class="flex flex-col">
              <AppDialog>
                <template #trigger>
                  <div class="cursor-pointer p-3 text-center hover:bg-muted">Editar</div>
                </template>
                <template #title> Editer vaga '{{ vacancy.title }}' </template>
                <template #description>
                  Edite sua vaga para que outras pessoas possam visualizar.
                </template>
                <template #main>
                  <VacancyForm
                    :title="vacancy.title"
                    :description="vacancy.description"
                    :state="vacancy.state"
                    :handle-submit="(values) => handleUpdateVacancy(vacancy.id, values)"
                  />
                </template>
              </AppDialog>

              <div
                @click="(e) => handleDeleteVacancy(vacancy.id)"
                class="cursor-pointer p-3 text-center hover:bg-muted"
              >
                Remover
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </template>
    </VacancyBox>
  </div>
  <Alert v-else>
    <AlertTitle>Projetos sem vagas abertas</AlertTitle>
    <AlertDescription> Fique ligado para as próximas vagas! </AlertDescription>
  </Alert>
</template>

<style scoped></style>
