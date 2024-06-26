import { Injectable } from '@nestjs/common';
import { CommentEntity, CommentEntityWithUser } from './comments.entity';
import { CreateCommentDto } from './dtos/CreateCommentDto';
import { UpdateCommentDto } from './dtos/UpdateCommentDto';
import { CommentsRepository } from './comments.repository';
import { CommentNotFoundException } from './comments.exceptions';
import { UserRepository } from 'src/core/profile/user/user.repository';
import { UserNotFoundException } from 'src/core/profile/user/user.exceptions';
import { PostsRepository } from '../posts/posts.repository';
import { PostNotFoundException } from '../posts/posts.exceptions';

export abstract class CommentsService {
  abstract getCommentById(id: number): Promise<CommentEntity>;
  abstract getCommentsByPostId(postId: number): Promise<CommentEntityWithUser[]>;
  abstract create(
    data: CreateCommentDto,
    userId: number,
  ): Promise<CommentEntityWithUser>;
  abstract update(id: number, data: UpdateCommentDto): Promise<CommentEntityWithUser>;
  abstract delete(id: number): Promise<CommentEntity>;
}

@Injectable()
export class CommentsServiceImpl implements CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostsRepository,
  ) {}

  async getCommentById(id: number): Promise<CommentEntity> {
    const comment = await this.commentsRepository.getCommentById(id);

    if (!comment) {
      throw new CommentNotFoundException();
    }
    return comment;
  }

  async getCommentsByPostId(postId: number): Promise<CommentEntityWithUser[]> {
    const postExist = await this.postRepository.getPostById(postId);

    if (!postExist) {
      throw new PostNotFoundException();
    }

    const comment = await this.commentsRepository.getCommentsByPostId(postId);
    return comment;
  }

  async create(data: CreateCommentDto, userId: number): Promise<CommentEntityWithUser> {
    const userExist = await this.userRepository.getUserById(userId);
    if (!userExist) {
      throw new UserNotFoundException();
    }
    const postExist = await this.postRepository.getPostById(data.postId);
    if (!postExist) {
      throw new PostNotFoundException();
    }
    const comment = await this.commentsRepository.create({ ...data, userId });
    return comment;
  }

  async update(id: number, data: UpdateCommentDto): Promise<CommentEntityWithUser> {
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
