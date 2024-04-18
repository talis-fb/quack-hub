import type { ICreateExperience } from '@/apis/experience/types/ICreateExperience'
import type { IUpdateExperinece } from '@/apis/experience/types/IUpdateExperinece'
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

  async function createExperience(data: ICreateExperience) {
    const res = await experienceService.create(data)

    experiences[data.type].push(res)
  }

  async function updateExperience(experienceId: number, data: IUpdateExperinece) {
    const res = await experienceService.update(experienceId, data)

    experiences[res.type] = experiences[res.type].map((experience) => {
      if (experience.id != res.id) return experience

      return res
    })
  }

  async function deleteExperience(experienceId: number) {
    const res = await experienceService.delete(experienceId)

    experiences[res.type] = experiences[res.type].filter((experience) => experience.id != res.id)
  }

  return {
    experiences,
    createExperience,
    updateExperience,
    deleteExperience,
    getExperiennces
  }
})
