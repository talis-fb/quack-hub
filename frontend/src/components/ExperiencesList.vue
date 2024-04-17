<script setup lang="ts">
// Vue imports
import { onMounted, ref } from 'vue'

// types
import { type ExperienceType } from '@/entites/IExperience'
import { type IExperienceEntity } from '@/entites/IExperience'

// Services
import { experienceService } from '@/services'

// App components
import ExperienceItem from '@/components/ExperienceItem.vue'

export interface ExperienceList {
  userId: number
  type: ExperienceType
}

const props = defineProps<ExperienceList>()

const experiences = ref<IExperienceEntity[]>([])

onMounted(async () => {
  const res = await experienceService.getExperiencesByUserId(props.userId, props.type)

  experiences.value = res
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-for="(experience, index) in experiences">
      <ExperienceItem :experience="experience" />
    </div>
  </div>
</template>

<style scoped></style>
