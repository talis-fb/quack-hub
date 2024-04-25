import type { ICreateVacancy } from '@/apis/project/types/ICreateVacancy'
import type { IUpdateVacancy } from '@/apis/project/types/IUpdateVacancy'
import type { IProjectEntity } from '@/entites/IProject'
import type { IVacancyEntity } from '@/entites/IVacancy'
import { projectService } from '@/services'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProjectStore = defineStore('project', () => {
  const project = ref<IProjectEntity | null>(null)
  //   const vacancies = ref<IVacancyEntity[]>([]);

  async function getProject(projetId: number) {
    const res = await projectService.getProjectById(projetId)

    project.value = res
  }

  async function createVacancy(data: ICreateVacancy) {
    const res = await projectService.createVacancy(data)

    project.value?.vacancies.push(res)
  }

  async function updateVacancy(vacancyId: number, data: IUpdateVacancy) {
    const res = await projectService.updateVacancy(vacancyId, data)

    if (!project.value) return

    project.value = {
      ...project.value,
      vacancies: project.value.vacancies.map((vacancy) => {
        if (vacancy.id == res.id) {
          return res
        }

        return vacancy
      })
    }
  }

  async function deleteVacancy(vacancyId: number) {
    const res = await projectService.deleteVacancy(vacancyId)

    if (!project.value) return

    project.value = {
      ...project.value,
      vacancies: project.value.vacancies.filter((vacancy) => vacancy.id != res.id)
    }
  }

  return { project, getProject, createVacancy, updateVacancy, deleteVacancy }
})
