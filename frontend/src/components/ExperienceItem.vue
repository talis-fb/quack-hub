<script setup lang="ts">
// App components
import ExperienceForm from '@/components/ExperienceForm.vue'
import AppDialog from '@/components/AppDialog.vue'

// Services
import { experienceService } from '@/services'

// Shadcn-vue components
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/toast/use-toast'

// Icons
import { Pencil, Trash } from 'lucide-vue-next'

// Types
import { type ExperienceDataForm } from '@/components/ExperienceForm.vue'
import type { IExperienceEntity } from '@/entites/IExperience'

export interface ExperienceItemProps {
  experience: IExperienceEntity
}

const props = defineProps<ExperienceItemProps>()

const { toast, dismiss } = useToast()

const handleSubmit = async (values: ExperienceDataForm) => {
  try {
    await experienceService.update(props.experience.id, {
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
</script>

<template>
  <Separator class="mb-4 bg-white/30" />
  <div class="group relative cursor-pointer hover:bg-black/40 p-3">
    <p class="text-xl">
      {{ experience.title }}
    </p>
    <p class="text-sm text-muted-foreground">
      {{ `${experience.startDate} - ${experience.endDate}` }}
    </p>
    <p class="text-base">
      {{ experience.about }}
    </p>

    <div class="hidden group-hover:flex absolute top-1/2 right-2 transform -translate-y-1/2 gap-2">
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
            :title="props.experience.title"
            :about="props.experience.about"
            :start-date="props.experience.startDate"
            :end-date="props.experience.endDate"
            :handle-submit="handleSubmit"
            title-label="Título"
            title-placeholder="Ex.: Desenvolvedor Backend"
            :type="experience.type"
          />
        </template>
      </AppDialog>

      <Button variant="destructive" size="icon">
        <Trash class="w-5 h-5" />
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
