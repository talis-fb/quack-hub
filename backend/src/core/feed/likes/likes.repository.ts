import { Injectable } from '@nestjs/common';
import { LikesData, LikesEntity } from './likes.entity';
import { PrismaService } from 'src/common/prisma/prisma.service';

export abstract class LikesRepository {
  abstract getLikes(postId: number): Promise<LikesEntity[]>;
  abstract getLikePost(
    postId: number,
    userId: number,
  ): Promise<LikesEntity | null>;
  abstract createLike(like: LikesData): Promise<LikesEntity>;
  abstract deleteLike(id: number): Promise<LikesEntity | null>;
}

@Injectable()
export class LikesRepositoryImpl implements LikesRepository {
  constructor(private prisma: PrismaService) {}

  async getLikes(postId: number): Promise<LikesEntity[]> {
    const output = await this.prisma.postLike.findMany({
      where: {
        postId,
      },
    });
    return output;
  }
  async getLikePost(postId: number, userId: number): Promise<LikesEntity> {
    const output = await this.prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId: postId,
          userId: userId,
        }
      }
    });
    return output;
  }
  async createLike(like: LikesData): Promise<LikesEntity> {
    const output = await this.prisma.postLike.create({
      data: {
        ...like,
      },
    });
    return output;
  }
  async deleteLike(id: number): Promise<LikesEntity> {
    const output = await this.prisma.postLike.delete({
      where: {
        id,
      },
    });
    return output;
  }
}
