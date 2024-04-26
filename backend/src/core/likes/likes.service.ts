import { Injectable } from '@nestjs/common';
import { LikesData, LikesEntity } from './likes.entity';
import { LikesRepository } from './likes.repository';
import { ServiceAlreadyExistException } from 'src/excpetions/service/ServiceAlreadyExistException';

export abstract class LikesService {
  abstract getLikes(postId: number): Promise<LikesEntity[]>;
  abstract getLikePost(
    postId: number,
    userId: number,
  ): Promise<LikesEntity | null>;
  abstract createLikes(like: LikesData): Promise<LikesEntity>;
  abstract deleteLikes(id: number): Promise<LikesEntity | null>;
}

@Injectable()
export class LikesServiceImpl implements LikesService {
  constructor(private repo: LikesRepository) {}

  public async getLikes(postId: number): Promise<LikesEntity[]> {
    const resLike = await this.repo.getLikes(postId);
    return resLike;
  }
  public async getLikePost(
    postId: number,
    userId: number,
  ): Promise<LikesEntity> {
    const resLike = await this.repo.getLikePost(postId, userId);
    return resLike;
  }
  public async createLikes(like: LikesData): Promise<LikesEntity> {
    const likeExist = await this.getLikePost(like.postId, like.userId);
    if (likeExist) {
      throw new ServiceAlreadyExistException(
        `O like na postagem de ID ${like.postId} do usuario com ID ${like.userId} já existe.`,
      );
    }
    const resLike = await this.repo.createLike(like);
    return resLike;
  }
  public async deleteLikes(id: number): Promise<LikesEntity> {
    const resLike = await this.repo.deleteLike(id);
    return resLike;
  }
}
