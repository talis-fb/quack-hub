import type { ILikeApi } from "@/apis/like/like.api";
import { ILikeEntity, type ILikeData } from "@/entites/ILike";

export interface ILikeService {
    getLikesPost(postId: number): Promise<ILikeEntity>
    createLike(data: ILikeData): Promise<ILikeEntity>
    deleteLike(likeId: number): Promise<ILikeEntity>
}

export class ILikeServiceImpl implements ILikeService {
    constructor(private readonly iLikeApi: ILikeApi) {}

    async getLikesPost(postId: number): Promise<ILikeEntity> {
        const res = await this.iLikeApi.getLikesByPost(postId);

        return res;
    }
    async createLike(data: ILikeData): Promise<ILikeEntity> {
        const res = await this.iLikeApi.createLike(data);

        return res;
    }
    async deleteLike(likeId: number): Promise<ILikeEntity> {
        const res = await this.iLikeApi.deleteLike(likeId);

        return res;
    }
    
}