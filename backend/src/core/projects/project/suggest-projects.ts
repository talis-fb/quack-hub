import { MethodologieEntity } from "src/core/methodologies/methodologie.entity";
import { ProjectEntity } from "src/core/projects/project/project.entity";

export abstract class SuggestProjects {
  abstract suggest(
    userMethodologies: MethodologieEntity[],
    projects: ProjectEntity[],
  ): ProjectEntity[];
}
