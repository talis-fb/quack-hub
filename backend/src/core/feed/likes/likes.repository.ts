import { Injectable } from '@nestjs/common';
import { LikesData, LikesEntity } from './likes.entity';
import { PrismaService } from 'src/common/prisma/prisma.service';

export abstract class LikesRepository {
  abstract getLikes(postId: number): Promise<LikesEntity[]>;
  abstract getLikePost(
    postId: number,
    userId: number,
  ): Promise<LikesEntity | void>;
  abstract createLike(like: LikesData): Promise<LikesEntity>;
  abstract deleteLike(id: number): Promise<LikesEntity | void>;
}

@Injectable()
export class LikesRepositoryImpl implements LikesRepository {
  constructor(private prisma: PrismaService) {}

  async getLikes(postId: number): Promise<LikesEntity[]> {
    return await this.prisma.postLike.findMany({
      where: {
        postId,
      },
    });
  }
  async getLikePost(postId: number, userId: number): Promise<LikesEntity | void> {
    return await this.prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId: postId,
          userId: userId,
        }
      }
    });
  }
  async createLike(like: LikesData): Promise<LikesEntity> {
    return await this.prisma.postLike.create({
      data: {
        ...like,
      },
    });
  }
  async deleteLike(id: number): Promise<LikesEntity | void> {
    return await this.prisma.postLike.delete({
      where: {
        id,
      },
    });
  }
}
