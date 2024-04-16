import type { IExperienceEntity } from "@/entites/IExperience";
import type { ICreateExperience } from "@/apis/experience/types/ICreateExperience";
import { api } from "@/network/api";

export interface IExperienceApi {
    create(data: ICreateExperience): Promise<IExperienceEntity>
}

export class ExperienceApiImpl implements IExperienceApi {
    async create(data: ICreateExperience): Promise<IExperienceEntity> {
        const res = await api.post<IExperienceEntity>('/experience', data);

        return res.data;
    }

}