import type { ExperienceType, IExperienceEntity } from '@/entites/IExperience'
import { experienceService } from '@/services'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

interface IExperiencesStore {
  ACADEMIC: IExperienceEntity[]
  PROFESSIONAL: IExperienceEntity[]
}

export const useExperienceStore = defineStore('experience', () => {
  // const experiences = ref<IExperienceEntity[]>([])

  // const academicExperiences = computed(() => {
  //   return experiences.value.filter((experience) => experience.type == 'ACADEMIC')
  // })

  // const professionalExperiences = computed(() => {
  //   return experiences.value.filter((experience) => experience.type == 'PROFESSIONAL')
  // })

  // async function getExperiennces(userId: number) {
  //   const res = await experienceService.getExperiencesByUserId(userId, undefined)

  //   experiences.value = res
  // }

  // return { experiences, academicExperiences, professionalExperiences, getExperiennces }

  const experiences: IExperiencesStore = reactive({
    ACADEMIC: [],
    PROFESSIONAL: []
  })

  // const academicExperiences = ref<IExperienceEntity[]>([])

  // const professionalExperiences = ref<IExperienceEntity[]>([])

  async function getExperiennces(userId: number, type: ExperienceType) {
    const res = await experienceService.getExperiencesByUserId(userId, type)

    // if (type == 'ACADEMIC') {
    //   academicExperiences.value = res
    // } else {
    //   professionalExperiences.value = res
    // }

    experiences[type] = res
  }

  return {
    experiences,
    getExperiennces
  }
})
