import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comments.entity';
import { CreateCommentDto } from './dtos/CreateCommentDto';
import { UpdateCommentDto } from './dtos/UpdateCommentDto';
import { CommentsRepository } from './comments.repository';
import { CommentNotFoundException } from './comments.exceptions';

export abstract class CommentsService {
  abstract getCommentById(id: number): Promise<CommentEntity>;
  abstract getCommentsByPostId(postId: number): Promise<CommentEntity[]>;
  abstract create(
    data: CreateCommentDto,
    userId: number,
  ): Promise<CommentEntity>;
  abstract update(id: number, data: UpdateCommentDto): Promise<CommentEntity>;
  abstract delete(id: number): Promise<CommentEntity>;
}

@Injectable()
export class CommentsServiceImpl implements CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async getCommentById(id: number): Promise<CommentEntity> {
    const comment = await this.commentsRepository.getCommentById(id);

    if (!comment) {
      throw new CommentNotFoundException();
    }
    return comment;
  }

  async getCommentsByPostId(postId: number): Promise<CommentEntity[]> {
    return await this.commentsRepository.getCommentsByPostId(postId);
  }

  async create(data: CreateCommentDto, userId: number): Promise<CommentEntity> {
    return await this.commentsRepository.create({ ...data, userId });
  }

  async update(id: number, data: UpdateCommentDto): Promise<CommentEntity> {
    const comment = await this.commentsRepository.update(id, data);
    if (!comment) {
      throw new CommentNotFoundException();
    }
    return comment;
  }

  async delete(id: number): Promise<CommentEntity> {
    const comment = await this.commentsRepository.delete(id);
    if (!comment) {
      throw new CommentNotFoundException();
    }
    return comment;
  }
}
