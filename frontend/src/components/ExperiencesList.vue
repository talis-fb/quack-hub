<script setup lang="ts">
// Vue imports
import { onMounted } from 'vue'

// types
import { type ExperienceType } from '@/entites/IExperience'

// App components
import ExperienceItem from '@/components/ExperienceItem.vue'
import { useExperienceStore } from '../stores/experience'
import { storeToRefs } from 'pinia'

export interface ExperienceListProps {
  userId: number
  type: ExperienceType
}

const props = defineProps<ExperienceListProps>()

const experienceStore = useExperienceStore()

const { experiences } = storeToRefs(experienceStore)

onMounted(async () => {
  await experienceStore.getExperiennces(props.userId, props.type)
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-for="(experience, index) in experiences[type]">
      <ExperienceItem :experience="experience" />
    </div>
  </div>
</template>

<style scoped></style>
