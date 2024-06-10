import { MethodologieEntity } from "src/core/methodologies/methodologie.entity";
import { ProjectEntity } from "../project.entity";
import { SuggestProjects } from "../suggest-projects";
import { Provider } from "@nestjs/common";

export class AlgoritmSuggestProjectsUSP implements SuggestProjects {
    suggest(
      userMethodologies: MethodologieEntity[],
      projects: ProjectEntity[],
    ): ProjectEntity[] {
        const listMethodologiesUser = userMethodologies.map((methodoligy => methodoligy.name));

        const scoreProjects = projects.map((project) => {
            const projectMethodologies = project.methodologies.map(
                (methodology) => methodology.name
            );

            const unknowMethodoliges = this.countUnknownMethodologies(
                listMethodologiesUser,
                projectMethodologies
            );

            return { project, unknowMethodoliges }
        });

        scoreProjects.sort((a, b) => a.unknowMethodoliges - b.unknowMethodoliges);

        return scoreProjects.map((scoreProject) => scoreProject.project);
    }
    
    private countUnknownMethodologies(
        projectMethodologies: string[],
        userMethodologies: string[],
    ): number {
        let contUnknowMethodologies = 0;
        for (let i = 0; i < userMethodologies.length; i++) {
            for (let j = 0; j < projectMethodologies.length; j++) {
                if(userMethodologies[i] != projectMethodologies[j]) {
                    contUnknowMethodologies ++;
                    break;
                }
            }
        }
        return contUnknowMethodologies;
    }
  }
  
  export const SuggestProjectsProviderUSP: Provider = {
    provide: SuggestProjects,
    useClass: AlgoritmSuggestProjectsUSP,
  };
  