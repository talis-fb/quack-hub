import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { CommentData, CommentEntity } from './comments.entity';

export abstract class CommentsRepository {
  abstract getCommentById(id: number): Promise<CommentEntity | null>;
  abstract getCommentsByPostId(postId: number): Promise<CommentEntity[]>;
  abstract create(data: CommentData): Promise<CommentEntity>;
  abstract update(
    id: number,
    data: Partial<CommentData>,
  ): Promise<CommentEntity | null>;
  abstract delete(id: number): Promise<CommentEntity | null>;
}

@Injectable()
export class CommentsRepositoryImpl implements CommentsRepository {
  constructor(private prisma: PrismaService) {}

  async getCommentById(id: number): Promise<CommentEntity> {
    const output = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });

    return output;
  }

  async getCommentsByPostId(postId: number): Promise<CommentEntity[]> {
    const output = await this.prisma.comment.findMany({
      where: {
        postId,
      },
    });

    return output;
  }

  async create(data: CommentData): Promise<CommentEntity> {
    const output = await this.prisma.comment.create({
      data,
    });

    return output;
  }

  async update(id: number, data: Partial<CommentData>): Promise<CommentEntity> {
    const output = await this.prisma.comment.update({
      where: {
        id,
      },
      data,
    });

    return output;
  }

  async delete(id: number): Promise<CommentEntity> {
    const output = await this.prisma.comment.delete({
      where: {
        id,
      },
    });

    return output;
  }
}
