<!-- OBS: NÃO ESTOU USANDO ESSE COMPONENTE. DEIXEI ESSE DEAD CODE APENAS CASO EU NECESSITE FUTURAMENTE -->

<script setup lang="ts">
import ExperienceForm from '@/components/ExperienceForm.vue'
import AppDialog from '@/components/AppDialog.vue'

// Shadcn-vue components
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/toast/use-toast'

// Icons
import { Plus, Pencil, Trash } from 'lucide-vue-next'

import { onMounted, ref } from 'vue'
import { experienceService } from '@/services'

// Types
import type { IExperienceEntity } from '@/entites/IExperience'
import { type ICreateExperience } from '@/apis/experience/types/ICreateExperience'
import { type ExperienceDataForm } from '@/components/ExperienceForm.vue'

export interface ProfessionalExperiencesProps {
  userId: number
}

const { toast, dismiss } = useToast()

const props = defineProps<ProfessionalExperiencesProps>()

const experiences = ref<IExperienceEntity[]>([])

const handleSubmit = async (values: ExperienceDataForm) => {
  try {
    const res = await experienceService.create({
      ...values,
      type: 'PROFESSIONAL',
      projectId: null,
      achievements: []
    })

    toast({
      title: 'Experiência',
      description: 'Experiência cadastrada com sucesso!',
      variant: 'default',
      duration: 1000
    })
  } catch (error: any) {
    toast({
      title: 'Erro ao criar a experiência',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
}

onMounted(async () => {
  const res = await experienceService.getExperiencesByUserId(props.userId, 'PROFESSIONAL')

  experiences.value = res
})
</script>

<template>
  <div class="flex items-center">
    <h2 class="text-2xl mr-auto">Experiências profissionais</h2>

    <AppDialog>
      <template #trigger>
        <Button variant="outline" size="icon" class="bg-transparent hover:bg-black/40">
          <Plus class="w-5 h-5" />
        </Button>
      </template>
      <template #title> Adicionar experiência profissional </template>
      <template #description>
        Adicione suas experiências profissionais para que outros usuários possam ver seu perfil
        profissional.
      </template>
      <template #main>
        <ExperienceForm
          :handle-submit="handleSubmit"
          title-label="Título"
          title-placeholder="Ex.: Desenvolvedor Backend"
          type="PROFESSIONAL"
        />
      </template>
    </AppDialog>

    <Button variant="outline" size="icon" class="bg-transparent hover:bg-black/40">
      <Pencil class="w-5 h-5" />
    </Button>
  </div>

  <div class="flex flex-col gap-5">
    <div class="text-xl" v-for="(experience, index) in experiences">
      <Separator class="mb-4 bg-white/30" />
      <div class="group relative cursor-pointer hover:bg-black/40 p-3">
        <p>
          {{ experience.title }}
        </p>
        <p class="text-sm text-muted-foreground">
          {{ `${experience.startDate} - ${experience.endDate}` }}
        </p>
        <p class="text-base">
          {{ experience.about }}
        </p>

        <div
          class="hidden group-hover:flex absolute top-1/2 right-2 transform -translate-y-1/2 gap-2"
        >
          <Button variant="default" size="icon">
            <Pencil class="w-5 h-5" />
          </Button>

          <Button variant="destructive" size="icon">
            <Trash class="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
