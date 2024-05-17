// import type { GithubApi } from '@/apis/github/github.api'

// export interface IProjectGithub {
//   methodologies: string[]
//   name: string
//   description: string
//   created_at: string
// }

// export class GithubRepository {
//   constructor(private readonly githubApi: GithubApi) {}

//   async getProject(username: string, projectName: string): Promise<IProjectGithub> {
//     const [info, languages] = await Promise.all([
//       this.githubApi.getInfoProject(username, projectName),
//       this.githubApi.getProjectLanguages(username, projectName)
//     ])

//     return {
//       methodologies: Object.keys(languages),
//       name: info.name,
//       description: info.description,
//       created_at: info.created_at
//     }
//   }
// }
