import type { ExperienceType, IExperienceEntity } from '@/entites/IExperience'
import { experienceService } from '@/services'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

type IExperiencesStore = Record<ExperienceType, IExperienceEntity[]>

export const useExperienceStore = defineStore('experience', () => {
  const experiences: IExperiencesStore = reactive({
    ACADEMIC: [],
    PROFESSIONAL: []
  })

  async function getExperiennces(userId: number, type: ExperienceType) {
    const res = await experienceService.getExperiencesByUserId(userId, type)

    experiences[type] = res
  }

  return {
    experiences,
    getExperiennces
  }
})
