<script setup lang="ts">
// Icons
import { MoreHorizontalIcon } from 'lucide-vue-next'

// App components
import AppDialog from '@/components/AppDialog.vue'
import VacancyBox from '@/components/VacancyBox.vue'
import VacancyForm, { type IVacancyFormData } from '@/components/VacancyForm.vue'

// Shadcn-vue components
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useToast } from './ui/toast'

// Vue imports
import { inject } from 'vue'

// Pinia store
import { useProjectStore } from '@/stores/project'
import { storeToRefs } from 'pinia'

const { toast } = useToast()

const projectStore = useProjectStore()

const { vacancies } = storeToRefs(projectStore)
export interface VacanciesListProps {
  projectId: number
}

const props = defineProps<VacanciesListProps>()

await projectStore.getVacancies(props.projectId)

/**
 * @type {boolean}
 * @description Check if vacancy owner is the same as the authenticated user
 * @description This is captured in the UserProfileView or ProjectView component
 
 */
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
  <VacancyBox v-for="vacancy in vacancies" :vacancy="vacancy" v-if="vacancies.length">
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
              <template #title> Editar vaga '{{ vacancy.title }}' </template>
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

  <Alert v-else>
    <AlertTitle>Projetos sem vagas abertas</AlertTitle>
    <AlertDescription> Fique ligado para as próximas vagas! </AlertDescription>
  </Alert>
</template>

<style scoped></style>
