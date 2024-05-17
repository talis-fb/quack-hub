import type { ILikeData, ILikeEntity } from "@/entites/ILike";
import { api } from "@/network/api";

export interface ILikeApi {
    getLikesByPost(postId: number): Promise<ILikeEntity>
    createLike(data: ILikeData): Promise<ILikeEntity>
    deleteLike(likeId: number): Promise<ILikeEntity>
}

export class LikeApiImpl implements ILikeApi {
    async getLikesByPost(postId: number): Promise<ILikeEntity> {
        const res = await api.get<ILikeEntity>(`/likes/${postId}`)

        return res.data
    }
    async createLike(data: ILikeData): Promise<ILikeEntity> {
        const res = await api.post<ILikeEntity>(`/likes`, data)

        return res.data;
    }
    async deleteLike(likeId: number): Promise<ILikeEntity> {
        const res = await api.delete<ILikeEntity>(`/likes/${likeId}`)

        return res.data
    }
    
}