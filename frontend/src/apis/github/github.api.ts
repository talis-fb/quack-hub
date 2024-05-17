// import { GITHUB_URL } from '@/network/config'
// import axios from 'axios'

// export interface IGetProjectGithubResponse {
//   name: string
//   description: string
//   created_at: string
// }

// export type IGetProjectLanguagesResponse = Record<string, number>

// export class GithubApi {
//   async getInfoProject(username: string, projectName: string) {
//     const res = await axios.get<IGetProjectGithubResponse>(
//       GITHUB_URL + `/repos/${username}/${projectName}`
//     )

//     return res.data
//   }

//   async getProjectLanguages(username: string, projectName: string) {
//     const res = await axios.get<IGetProjectLanguagesResponse>(
//       GITHUB_URL + `/repos/${username}/${projectName}/languages`
//     )

//     return res.data
//   }
// }
