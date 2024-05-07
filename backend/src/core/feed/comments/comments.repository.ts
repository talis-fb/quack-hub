import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  CommentData,
  CommentEntity,
  CommentEntityWithUser,
} from './comments.entity';

export abstract class CommentsRepository {
  abstract getCommentById(id: number): Promise<CommentEntity | void>;
  abstract getCommentsByPostId(
    postId: number,
  ): Promise<CommentEntityWithUser[]>;
  abstract create(data: CommentData): Promise<CommentEntityWithUser>;
  abstract update(
    id: number,
    data: Partial<CommentData>,
  ): Promise<CommentEntityWithUser | void>;
  abstract delete(id: number): Promise<CommentEntity | void>;
}

@Injectable()
export class CommentsRepositoryImpl implements CommentsRepository {
  constructor(private prisma: PrismaService) {}

  async getCommentById(id: number): Promise<CommentEntity | void> {
    return await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });
  }

  async getCommentsByPostId(postId: number): Promise<CommentEntityWithUser[]> {
    return await this.prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        User: true,
      },
    });
  }

  async create(data: CommentData): Promise<CommentEntityWithUser> {
    return await this.prisma.comment.create({
      data,
      include: {
        User: true,
      },
    });
  }

  async update(
    id: number,
    data: Partial<CommentData>,
  ): Promise<CommentEntityWithUser | void> {
    return await this.prisma.comment.update({
      where: {
        id,
      },
      data,
      include: {
        User: true,
      },
    });
  }

  async delete(id: number): Promise<CommentEntity | void> {
    return await this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}
