import type { IExperienceData } from "@/entites/IExperience";

export interface ICreateExperience extends Omit<IExperienceData, "userId">{}

