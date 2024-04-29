import { Injectable, Provider } from '@nestjs/common';

import { PostData, PostEntity } from './posts.entity';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreatePostDto } from './dtos/CreatePostDto';
import { UpdatePostDto } from './dtos/UpdatePostDto';

export abstract class PostsRepository {
  abstract getPostById(id: number): Promise<PostEntity | void>;
  abstract getPostsByUserId(userId: number): Promise<PostEntity[]>;
  abstract create(data: PostData, userId: number): Promise<PostEntity>;
  abstract update(
    id: number,
    data: Partial<PostData>,
  ): Promise<PostEntity | void>;
  abstract delete(id: number): Promise<PostEntity | void>;
}

@Injectable()
export class PostsRepositoryImpl implements PostsRepository {
  constructor(private prisma: PrismaService) {}

  async getPostById(id: number): Promise<PostEntity | void> {
    return await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
  }

  async getPostsByUserId(userId: number): Promise<PostEntity[]> {
    return await this.prisma.post.findMany({
      where: {
        userId,
      },
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
  }

  async create(data: PostData, userId: number): Promise<PostEntity> {
    return await this.prisma.post.create({
      data: {
        ...data,
        userId,
      },
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    data: Partial<PostData>,
  ): Promise<PostEntity | void> {
    return await this.prisma.post.update({
      where: {
        id,
      },
      data,
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<PostEntity | void> {
    return await this.prisma.post.delete({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
  }
}

export const PostsRepositoryProvider: Provider = {
  provide: PostsRepository,
  useClass: PostsRepositoryImpl,
};
