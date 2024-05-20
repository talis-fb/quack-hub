import { Provider } from "@nestjs/common";
import { MethodologieEntity } from "src/core/methodologies/methodologie.entity";
import { ProjectEntity } from "src/core/projects/project/project.entity";

export abstract class SuggestProjects {
  abstract suggest(
    userMethodologies: MethodologieEntity[],
    projects: ProjectEntity[],
  ): ProjectEntity[];
}

export class AlgoritmSuggestProjects implements SuggestProjects {
  suggest(
    userMethodologies: MethodologieEntity[],
    projects: ProjectEntity[],
  ): ProjectEntity[] {
    const userVector = userMethodologies.map((methodology) => 1);

    const scoredProjects = projects.map((project) => {
      const projectVector = this.createVector(
        project.methodologies.map((methodology) => methodology.name),
        userMethodologies.map((methodology) => methodology.name),
      );

      const similarity = this.calculateCosineSimilarity(
        userVector,
        projectVector,
      );

      return { project, similarity };
    });

    scoredProjects.sort((a, b) => b.similarity - a.similarity);

    return scoredProjects.map((scoredProject) => scoredProject.project);
  }

  private createVector(
    methodologies: string[],
    referenceMethodologies: string[],
  ): number[] {
    return referenceMethodologies.map((methodology) =>
      methodologies.includes(methodology) ? 1 : 0,
    );
  }
  private calculateCosineSimilarity(vec1: number[], vec2: number[]): number {
    const dotProduct = vec1.reduce(
      (sum, val, index) => sum + val * vec2[index],
      0,
    );
    const magnitude1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
    return magnitude1 && magnitude2
      ? dotProduct / (magnitude1 * magnitude2)
      : 0;
  }
}

export const SuggestProjectsProvider: Provider = {
  provide: SuggestProjects,
  useClass: AlgoritmSuggestProjects,
};
