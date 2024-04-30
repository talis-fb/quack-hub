import { GITHUB_URL } from '@/network/config'
import axios from 'axios'

export interface IProjectGithubResponse {
  name: string
  description: string
  created_at: string
  language: string
}

export class GithubApi {
  async getProject(username: string, projectName: string) {
    const res = await axios.get<IProjectGithubResponse>(
      GITHUB_URL + `/repos/${username}/${projectName}`
    )

    return res
  }
}
