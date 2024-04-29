import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { CommentData, CommentEntity } from './comments.entity';

export abstract class CommentsRepository {
  abstract getCommentById(id: number): Promise<CommentEntity | void>;
  abstract getCommentsByPostId(postId: number): Promise<CommentEntity[]>;
  abstract create(data: CommentData): Promise<CommentEntity>;
  abstract update(
    id: number,
    data: Partial<CommentData>,
  ): Promise<CommentEntity | void>;
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

  async getCommentsByPostId(postId: number): Promise<CommentEntity[]> {
    return await this.prisma.comment.findMany({
      where: {
        postId,
      },
    });
  }

  async create(data: CommentData): Promise<CommentEntity> {
    return await this.prisma.comment.create({
      data,
    });
  }

  async update(id: number, data: Partial<CommentData>): Promise<CommentEntity | void> {
    return await this.prisma.comment.update({
      where: {
        id,
      },
      data,
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
