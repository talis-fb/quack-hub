import { HttpService } from '@nestjs/axios';
import { Injectable, Provider } from '@nestjs/common';

abstract class GetProjectGithubResponse {
  name: string;
  description: string;
  created_at: string;
}

type IGetProjectLanguagesResponse = Record<string, number>;

export abstract class ImportedProject {
  // methodologies: string[];
  name: string;
  description: string;
  created_at: string;
}

export abstract class ProjectImporter {
  public abstract importProject(
    username: string,
    projectName: string,
  ): Promise<ImportedProject>;
}

@Injectable()
export class ProjectImporterGithub implements ProjectImporter {
  private url: string;

  constructor(private readonly httpService: HttpService) {
    this.url = 'https://api.github.com';
  }

  public async importProject(
    username: string,
    projectName: string,
  ): Promise<ImportedProject> {
    const [info, languages] = await Promise.all([
      this.getInfoProject(username, projectName),
      this.getProjectLanguages(username, projectName),
    ]);

    return {
      // methodologies: Object.keys(languages),
      name: info.name,
      description: info.description,
      created_at: info.created_at,
    };
  }

  private async getInfoProject(
    username: string,
    projectName: string,
  ): Promise<any> {
    const res = await this.httpService.axiosRef.get<GetProjectGithubResponse>(
      this.url + `/repos/${username}/${projectName}`,
    );

    return res.data;
  }

  private async getProjectLanguages(username: string, projectName: string) {
    const res =
      await this.httpService.axiosRef.get<IGetProjectLanguagesResponse>(
        this.url + `/repos/${username}/${projectName}/languages`,
      );

    return res.data;
  }
}

export const ProjectImpoterProvider: Provider = {
  provide: ProjectImporter,
  useClass: ProjectImporterGithub,
};
