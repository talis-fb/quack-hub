import { Injectable } from '@nestjs/common';
import { LikesData, LikesEntity } from './likes.entity';
import { LikesRepository } from './likes.repository';
import { UserRepository } from 'src/core/profile/user/user.repository';
import {
  LikeAlreadyGivenException,
  LikeNotFoundException,
} from './likes.exceptions';
import { UserNotFoundException } from 'src/core/profile/user/user.exceptions';
import { PostsRepository } from 'src/core/feed/posts/posts.repository';
import { PostNotFoundException } from 'src/core/feed/posts/posts.exceptions';

export abstract class LikesService {
  abstract getLikes(postId: number): Promise<LikesEntity[]>;
  abstract getLikePost(postId: number, userId: number): Promise<LikesEntity>;
  abstract createLikes(like: LikesData): Promise<LikesEntity>;
  abstract deleteLikes(id: number): Promise<LikesEntity>;
}

@Injectable()
export class LikesServiceImpl implements LikesService {
  constructor(
    private repo: LikesRepository,
    private userRepository: UserRepository,
    private postRepository: PostsRepository,
  ) {}

  public async getLikes(postId: number): Promise<LikesEntity[]> {
    return await this.repo.getLikes(postId);
  }
  public async getLikePost(
    postId: number,
    userId: number,
  ): Promise<LikesEntity> {
    const like = await this.repo.getLikePost(postId, userId);
    if (!like) {
      throw new LikeNotFoundException();
    }
    return like;
  }
  public async createLikes(like: LikesData): Promise<LikesEntity> {
    const userExist = await this.userRepository.getUserById(like.userId);
    if (!userExist) {
      throw new UserNotFoundException();
    }

    const postExist = await this.postRepository.getPostById(like.postId);
    if (!postExist) {
      throw new PostNotFoundException();
    }

    const likeExist = await this.getLikePost(like.postId, like.userId);
    if (likeExist) {
      throw new LikeAlreadyGivenException();
    }

    return await this.repo.createLike(like);
  }
  public async deleteLikes(id: number): Promise<LikesEntity> {
    const like = await this.repo.deleteLike(id);
    if (!like) {
      throw new LikeNotFoundException();
    }
    return like;
  }
}
