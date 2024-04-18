import { OmitType } from "@nestjs/swagger";
import { ExperienceData } from "../experience.entity";

export class CreateExperienceDto extends OmitType(ExperienceData, ["userId"]) {}