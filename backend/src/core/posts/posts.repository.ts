import { Injectable } from '@nestjs/common';

import { PostData, PostEntity } from './posts.entity';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreatePostDto } from './dtos/CreatePostDto';
import { UpdatePostDto } from './dtos/UpdatePostDto';

export abstract class PostsRepository {
  abstract getPostById(id: number): Promise<PostEntity | null>;
  abstract getPostsByUserId(userId: number): Promise<PostEntity[]>;
  abstract create(data: PostData, userId: number): Promise<PostEntity>;
  abstract update(
    id: number,
    data: Partial<PostData>,
  ): Promise<PostEntity | null>;
  abstract delete(id: number): Promise<PostEntity | null>;
}

@Injectable()
export class PostsRepositoryImpl implements PostsRepository {
  constructor(private prisma: PrismaService) {}

  async getPostById(id: number): Promise<PostEntity> {
    const output = await this.prisma.post.findUnique({
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

    return output;
  }

  async getPostsByUserId(userId: number): Promise<PostEntity[]> {
    const output = await this.prisma.post.findMany({
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

    return output;
  }

  async create(data: PostData, userId: number): Promise<PostEntity> {
    const output = await this.prisma.post.create({
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

    return output;
  }

  async update(id: number, data: Partial<PostData>): Promise<PostEntity> {
    const output = await this.prisma.post.update({
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

    return output;
  }

  async delete(id: number): Promise<PostEntity> {
    const output = await this.prisma.post.delete({
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

    return output;
  }
}
