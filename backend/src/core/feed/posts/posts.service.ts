import { Injectable, Provider } from '@nestjs/common';
import { PostEntity, PostEntityWithUser } from 'src/core/feed/posts/posts.entity';
import { CreatePostDto } from 'src/core/feed/posts/dtos/CreatePostDto';
import { UpdatePostDto } from 'src/core/feed/posts/dtos/UpdatePostDto';
import { PostsRepository } from 'src/core/feed/posts/posts.repository';
import { PostNotFoundException } from 'src/core/feed/posts/posts.exceptions';
import { UserRepository } from 'src/core/profile/user/user.repository';
import { UserNotFoundException } from 'src/core/profile/user/user.exceptions';

export abstract class PostsService {
  abstract getPostById(id: number): Promise<PostEntityWithUser>;
  abstract getPostsByUserId(userId: number): Promise<PostEntityWithUser[]>;
  abstract create(data: CreatePostDto, userId: number): Promise<PostEntity>;
  abstract update(id: number, data: UpdatePostDto): Promise<PostEntity>;
  abstract delete(id: number): Promise<PostEntity>;
  abstract search(searchUsername?: string): Promise<PostEntityWithUser[]>;
}

@Injectable()
export class PostsServiceImpl implements PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getPostById(id: number): Promise<PostEntityWithUser> {
    const post = await this.postsRepository.getPostById(id);

    if (!post) {
      throw new PostNotFoundException();
    }

    return post;
  }

  async getPostsByUserId(userId: number): Promise<PostEntityWithUser[]> {
    const userExist = await this.userRepository.getUserById(userId);
    if (!userExist) {
      throw new UserNotFoundException();
    }
    const postsUser = await this.postsRepository.getPostsByUserId(userId);
    return postsUser;
  }

  async create(data: CreatePostDto, userId: number): Promise<PostEntity> {
    const userExist = await this.userRepository.getUserById(userId);
    if (!userExist) {
      throw new UserNotFoundException();
    }
    return await this.postsRepository.create(data, userId);
  }

  async update(id: number, data: UpdatePostDto): Promise<PostEntity> {
    const postUpdated = await this.postsRepository.update(id, data);

    if (!postUpdated) {
      throw new PostNotFoundException();
    }

    return postUpdated;
  }

  async delete(id: number): Promise<PostEntity> {
    const post = await this.postsRepository.delete(id);

    if (!post) {
      throw new PostNotFoundException();
    }

    return post;
  }

  async search(searchUsername?: string): Promise<PostEntityWithUser[]> {
    const posts = await this.postsRepository.search(searchUsername);

    return posts;
  }
}

export const PostServiceProvider: Provider = {
  provide: PostsService,
  useClass: PostsServiceImpl,
};
