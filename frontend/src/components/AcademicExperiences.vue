<script setup lang="ts">
// App Components
import ExperienceForm from '@/components/ExperienceForm.vue'
import AppDialog from '@/components/AppDialog.vue'

// Shadcn-vue components
import { Button } from '@/components/ui/button'

// Icons
import { Plus, Pencil } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { experienceService } from '@/services'
import type { IExperienceEntity } from '@/entites/IExperience'

export interface AcademicExperiencesProps {
  userId: number
}

const props = defineProps<AcademicExperiencesProps>()

const experiences = ref<IExperienceEntity[]>([])

onMounted(async () => {
  const res = await experienceService.getExperiencesByUserId(props.userId, 'ACADEMIC')

  experiences.value = res
})
</script>

<template>
  <div class="flex items-center">
    <h2 class="text-2xl mr-auto">Experiências acadêmicas</h2>

    <AppDialog>
      <template #trigger>
        <Button variant="outline" size="icon" class="bg-transparent hover:bg-black/40">
          <Plus class="w-5 h-5" />
        </Button>
      </template>
      <template #title> Adicionar experiência acadêmica </template>
      <template #description>
        Adicione suas experiências acadêmicas para que outros usuários possam ver seu perfil
        acadêmico.
      </template>
      <template #main>
        <ExperienceForm
          title-label="Instituição de ensino"
          title-placeholder="Ex.: UFRN"
          type="ACADEMIC"
        />
      </template>
    </AppDialog>

    <Button variant="outline" size="icon" class="bg-transparent hover:bg-black/40">
      <Pencil class="w-5 h-5" />
    </Button>
  </div>

  <div class="flex flex-col gap-5">
    <div class="text-xl" v-for="experience in experiences">
      <p>
        {{ experience.title }}
      </p>
      <p class="text-sm text-muted-foreground">
        {{ `${experience.startDate} - ${experience.endDate}` }}
      </p>
      <p class="text-base">
        {{ experience.about }}
      </p>
    </div>
  </div>


</template>

<style scoped></style>
