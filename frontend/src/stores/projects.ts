import type { IInputProjectData, IProjectEntity } from '@/entites/IProject'
import { projectService } from '@/services'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<IProjectEntity[]>([])

  async function getProjects(title?: string, userId?: number, states?: string[]) {
    const res = await projectService.search(title, userId, states)

    projects.value = res
  }

  async function createProject(data: IInputProjectData) {
    const res = await projectService.create(data)

    projects.value.push(res)
  }

  async function updateProject(projectId: number, data: IInputProjectData) {
    const res = await projectService.update(projectId, data)

    projects.value = projects.value.map((project) => {
      if (project.id != res.id) return project

      return res
    })
  }

  async function deleteProject(projectId: number) {
    const res = await projectService.delete(projectId)

    projects.value = projects.value.filter((project) => project.id != res.id)
  }

  return { projects, getProjects, createProject, updateProject, deleteProject }
})
