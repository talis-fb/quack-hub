<script setup lang="ts">
// types
import { type ExperienceType } from '@/entites/IExperience'

// App components
import ExperienceItem from '@/components/ExperienceItem.vue'
import { useExperienceStore } from '../stores/experience'
import { storeToRefs } from 'pinia'

// Shadcn-vue components
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export interface ExperienceListProps {
  userId: number
  type: ExperienceType
}

const props = defineProps<ExperienceListProps>()

const experienceStore = useExperienceStore()

const { experiences } = storeToRefs(experienceStore)

// onMounted(async () => {
// })
await experienceStore.getExperiennces(props.userId, props.type)
</script>

<template>
  <div class="flex flex-col">
    <div v-if="experiences[type].length" v-for="(experience, index) in experiences[type]">
      <ExperienceItem :experience="experience" />
      <Separator />
    </div>

    <Alert v-else>
      <AlertTitle
        >Usuário sem experiências
        {{ props.type == 'ACADEMIC' ? 'acadêmicas' : 'profisisonais' }}</AlertTitle
      >
      <!-- <AlertDescription></AlertDescription> -->
    </Alert>
  </div>
</template>

<style scoped></style>
