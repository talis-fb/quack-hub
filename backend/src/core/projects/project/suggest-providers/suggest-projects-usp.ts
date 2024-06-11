import { MethodologieEntity } from "src/core/methodologies/methodologie.entity";
import { ProjectEntity } from "../project.entity";
import { SuggestProjects } from "../suggest-projects";
import { Provider } from "@nestjs/common";

export class AlgoritmSuggestProjectsUSP implements SuggestProjects {
    suggest(
      userMethodologies: MethodologieEntity[],
      projects: ProjectEntity[],
    ): ProjectEntity[] {
        const userMethodologiesSet = new Set(userMethodologies.map(methodology => methodology.name));

        const scoreProjects = projects.map(project => {
            const projectMethodologiesSet = new Set(project.methodologies.map
                (methodology => methodology.name)
            );

            const unknownMethodologiesCount = this.countUnknownMethodologies(
                userMethodologiesSet,
                projectMethodologiesSet
            );

            return { project, unknownMethodologiesCount };
        });

        scoreProjects.sort((a, b) => a.unknownMethodologiesCount - b.unknownMethodologiesCount);

        return scoreProjects.map(scoreProject => scoreProject.project);
    }
    
    private countUnknownMethodologies(
        userMethodologiesSet: Set<string>,
        projectMethodologiesSet: Set<string>,
    ): number {
        let unknownMethodologiesCount = 0;
        
        projectMethodologiesSet.forEach(methodology => {
            if (!userMethodologiesSet.has(methodology)) {
                unknownMethodologiesCount++;
            }
        });

        return unknownMethodologiesCount;
    }
  }
  
  export const SuggestProjectsProviderUSP: Provider = {
    provide: SuggestProjects,
    useClass: AlgoritmSuggestProjectsUSP,
  };
  