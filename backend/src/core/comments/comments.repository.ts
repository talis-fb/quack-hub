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
  getCommentById(id: number): Promise<CommentEntity> {
    throw new Error('Method not implemented.');
  }

  getCommentsByPostId(postId: number): Promise<CommentEntity[]> {
    throw new Error('Method not implemented.');
  }

  create(data: CommentData): Promise<CommentEntity> {
    throw new Error('Method not implemented.');
  }

  update(id: number, data: Partial<CommentData>): Promise<CommentEntity> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<CommentEntity> {
    throw new Error('Method not implemented.');
  }
}
