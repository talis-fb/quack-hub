<script setup lang="ts">
// App components
import ExperienceForm from '@/components/ExperienceForm.vue'
import AppDialog from '@/components/AppDialog.vue'
import AppAlertDialog from '@/components/AppAlertDialog.vue'

// Shadcn-vue components
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'

// Icons
import { Pencil, Trash } from 'lucide-vue-next'

// Types
import type { IExperienceEntity } from '@/entites/IExperience'
import { useExperienceStore } from '@/stores/experience'
import type { ICreateExperience } from '@/apis/experience/types/ICreateExperience'
import { inject } from 'vue'

export interface ExperienceItemProps {
  experience: IExperienceEntity
}

/**
 * O provedor desse inject ẽ um componente pai. No caso o componente UserProfileView
 */
const hasPermissions = inject('hasPermissions', false)

const experienceStore = useExperienceStore()

const props = defineProps<ExperienceItemProps>()

const { toast, dismiss } = useToast()

const handleUpdateExperience = async (values: ICreateExperience) => {
  try {
    await experienceStore.updateExperience(props.experience.id, {
      ...values
    })

    toast({
      title: `Experiência ${values.type == 'ACADEMIC' ? 'acadêmica' : 'profissional'}`,
      description: 'Experiência atualizada com sucesso!',
      variant: 'default',
      duration: 1000
    })
  } catch (error: any) {
    toast({
      title: 'Erro ao atualizar a experiência',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
}

const handleDeleteExperience = async () => {
  try {
    await experienceStore.deleteExperience(props.experience.id)

    toast({
      title: `Experiência`,
      description: 'Experiência deletada com sucesso!',
      variant: 'default',
      duration: 1000
    })
  } catch (error: any) {
    toast({
      title: 'Erro ao deletar a experiência',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
}
</script>

<template>
  <div class="group relative cursor-pointer hover:bg-black/40 px-4 py-3 rounded-sm">
    <p class="text-xl">
      {{ experience.title }}
    </p>
    <p class="text-sm text-muted-foreground">
      {{ `${experience.startDate} - ${experience.endDate}` }}
    </p>
    <p class="text-base">
      {{ experience.about }}
    </p>

    <div
      v-if="hasPermissions"
      class="hidden group-hover:flex absolute top-1/2 right-2 transform -translate-y-1/2 gap-2"
    >
      <AppDialog>
        <template #trigger>
          <Button variant="default" size="icon">
            <Pencil class="w-5 h-5" />
          </Button>
        </template>
        <template #title> Editer experiência '{{ experience.title }}' </template>
        <template #description>
          Edite suas experiências acadêmicas para que outros usuários possam ver seu perfil
          atualizado.
        </template>
        <template #main>
          <ExperienceForm
            :experience="props.experience"
            :handle-submit="handleUpdateExperience"
            title-label="Título"
            title-placeholder="Ex.: Desenvolvedor Backend"
            :type="experience.type"
          />
        </template>
      </AppDialog>

      <AppAlertDialog :handleAction="handleDeleteExperience">
        <template #trigger>
          <Button variant="destructive" size="icon">
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
