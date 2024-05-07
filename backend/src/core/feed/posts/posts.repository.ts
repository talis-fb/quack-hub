import { Injectable, Provider } from '@nestjs/common';

import { PostData, PostEntity, PostEntityWithUser } from './posts.entity';
import { PrismaService } from 'src/common/prisma/prisma.service';

export abstract class PostsRepository {
  abstract getPostById(id: number): Promise<PostEntityWithUser | void>;
  abstract getPostsByUserId(userId: number): Promise<PostEntityWithUser[]>;
  abstract create(data: PostData, userId: number): Promise<PostEntityWithUser>;
  abstract update(
    id: number,
    data: Partial<PostData>,
  ): Promise<PostEntityWithUser | void>;
  abstract delete(id: number): Promise<PostEntity | void>;
  abstract search(searchUsername?: string): Promise<PostEntityWithUser[]>;
}

@Injectable()
export class PostsRepositoryImpl implements PostsRepository {
  constructor(private prisma: PrismaService) {}

  async getPostById(id: number): Promise<PostEntityWithUser | void> {
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
        User: true,
      },
    });
  }

  async getPostsByUserId(userId: number): Promise<PostEntityWithUser[]> {
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
        User: true,
      },
    });
  }

  async create(data: PostData, userId: number): Promise<PostEntityWithUser> {
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
        User: true,
      },
    });
  }

  async update(
    id: number,
    data: Partial<PostData>,
  ): Promise<PostEntityWithUser | void> {
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
        User: true,
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

  public async search(searchUsername?: string): Promise<PostEntityWithUser[]> {
    const output = await this.prisma.post.findMany({
      where: {
        User: {
          name: {
            contains: searchUsername,
          },
        },
      },
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
        User: true,
      },
    });

    return output;
  }
}

export const PostsRepositoryProvider: Provider = {
  provide: PostsRepository,
  useClass: PostsRepositoryImpl,
};
