import type { ICreateVacancy } from '@/types/ICreateVacancy'
import type { IUpdateProject } from '@/types/IUpdateProject'
import type { IUpdateVacancy } from '@/types/IUpdateVacancy'
import type { IProjectEntity } from '@/entites/IProject'
import type { IVacancyEntity } from '@/entites/IVacancy'
import { projectService, vacancyService } from '@/services'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProjectStore = defineStore('project', () => {
  const project = ref<IProjectEntity | null>(null)
  const vacancies = ref<IVacancyEntity[]>([])

  function setProject(data: IProjectEntity) {
    project.value = data
  }

  async function updateProject(projectId: number, data: IUpdateProject) {
    const res = await projectService.update(projectId, data)

    project.value = res
  }

  async function getVacancies(projectId: number) {
    const res = await vacancyService.getVacanciesByProjectId(projectId)

    vacancies.value = res
  }

  async function createVacancy(data: ICreateVacancy) {
    const res = await vacancyService.create(data)

    vacancies.value.push(res)
  }

  async function updateVacancy(vacancyId: number, data: IUpdateVacancy) {
    const res = await vacancyService.update(vacancyId, data)

    vacancies.value = vacancies.value.map((vacancy) => {
      if (vacancy.id == res.id) {
        return res
      }

      return vacancy
    })
  }

  async function deleteVacancy(vacancyId: number) {
    const res = await vacancyService.delete(vacancyId)

    vacancies.value = vacancies.value.filter((vacancy) => vacancy.id != res.id)
  }

  return {
    project,
    vacancies,
    setProject,
    updateProject,
    getVacancies,
    createVacancy,
    updateVacancy,
    deleteVacancy
  }
})
