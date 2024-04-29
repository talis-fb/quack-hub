import { OmitType } from "@nestjs/swagger";
import { ExperienceData } from "src/core/profile/experience/experience.entity";

export class CreateExperienceDto extends OmitType(ExperienceData, ["userId"]) {}