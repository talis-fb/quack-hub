import type { IAchievementEntity } from "./IAchievement";

export const ExperienceTypeValues = ['PROFESSIONAL', 'ACADEMIC'] as const

export type ExperienceType = (typeof ExperienceTypeValues)[number];

export interface IExperienceData {
    title: string;
    about: string;
    startDate: Date;
    endDate: Date
    type: ExperienceType;
    userId: number;
    projectId?: number;
    achievements: IAchievementEntity[]
  }
  
  export interface IExperienceEntity extends IExperienceData {
    id: number
    // createdAt: string
    // updatedAt: string
  }
  