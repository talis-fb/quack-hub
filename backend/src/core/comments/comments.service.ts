import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comments.entity';
import { CreateCommentDto } from './dtos/CreateCommentDto';
import { UpdateCommentDto } from './dtos/UpdateCommentDto';
import { CommentsRepository } from './comments.repository';

export abstract class CommentsService {
  abstract getCommentById(id: number): Promise<CommentEntity | null>;
  abstract getCommentsByPostId(postId: number): Promise<CommentEntity[]>;
  abstract create(
    data: CreateCommentDto,
    userId: number,
  ): Promise<CommentEntity>;
  abstract update(
    id: number,
    data: UpdateCommentDto,
  ): Promise<CommentEntity | null>;
  abstract delete(id: number): Promise<CommentEntity | null>;
}

@Injectable()
export class CommentsServiceImpl implements CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  getCommentById(id: number): Promise<CommentEntity> {
    throw new Error('Method not implemented.');
  }

  getCommentsByPostId(postId: number): Promise<CommentEntity[]> {
    throw new Error('Method not implemented.');
  }

  create(data: CreateCommentDto, userId: number): Promise<CommentEntity> {
    throw new Error('Method not implemented.');
  }

  update(id: number, data: UpdateCommentDto): Promise<CommentEntity> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<CommentEntity> {
    throw new Error('Method not implemented.');
  }
}
