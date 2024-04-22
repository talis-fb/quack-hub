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

  async getCommentById(id: number): Promise<CommentEntity> {
    const output = await this.commentsRepository.getCommentById(id);

    return output;
  }

  async getCommentsByPostId(postId: number): Promise<CommentEntity[]> {
    const output = await this.commentsRepository.getCommentsByPostId(postId);

    return output;
  }

  async create(data: CreateCommentDto, userId: number): Promise<CommentEntity> {
    const output = await this.commentsRepository.create({ ...data, userId });

    return output;
  }

  async update(id: number, data: UpdateCommentDto): Promise<CommentEntity> {
    const output = await this.commentsRepository.update(id, data);

    return output;
  }

  async delete(id: number): Promise<CommentEntity> {
    const output = await this.commentsRepository.delete(id);

    return output;
  }
}
