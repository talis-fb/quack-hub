import { Injectable } from "@nestjs/common";
import { ExperienceData, ExperienceEntity } from "../user/user.entity";
import { PrismaService } from "src/common/prisma/prisma.service";

export abstract class ExperienceRepository {
    abstract getExperienceById(id: number): Promise<ExperienceEntity | null>;
    abstract createExperience(experience: ExperienceData): Promise<ExperienceEntity>;
    abstract updateExperience(is: number, experience: Partial<ExperienceData>):Promise<ExperienceEntity | null>;
}

@Injectable
export class ExperienceRepositoryImpl implements ExperienceRepository {
    constructor(private prisma: PrismaService) {}

    async async getExperienceById(id: number): Promise<ExperienceEntity> {
        
    }
}
