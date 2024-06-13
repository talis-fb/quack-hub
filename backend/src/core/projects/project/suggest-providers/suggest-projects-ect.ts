import { MethodologieEntity } from "src/core/methodologies/methodologie.entity";
import { ProjectEntity } from "../project.entity";
import { SuggestProjects } from "../suggest-projects";
import { Provider } from "@nestjs/common";

export class AlgoritmSuggestProjectsECT implements SuggestProjects {
    suggest(
      userMethodologies: MethodologieEntity[],
      projects: ProjectEntity[],
    ): ProjectEntity[] {
        const sortedProjects = this.sortProjectsByStartDate(projects);
        
        return sortedProjects;
    }
    
    private sortProjectsByStartDate(projects: ProjectEntity[]): ProjectEntity[] {
        return projects.sort((a, b) => {
            const dateA = new Date(a.startDate);
            const dateB = new Date(b.startDate);
            return dateB.getTime() - dateA.getTime();
        });
    }
  }
  
  export const SuggestProjectsProviderECT: Provider = {
    provide: SuggestProjects,
    useClass: AlgoritmSuggestProjectsECT,
  };
  