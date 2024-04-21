import { Injectable } from '@nestjs/common';
import { PostEntity } from './posts.entity';
import { CreatePostDto } from './dtos/CreatePostDto';
import { UpdatePostDto } from './dtos/UpdatePostDto';
import { PostsRepository } from './posts.repository';

export abstract class PostsService {
  abstract getPostById(id: number): Promise<PostEntity | null>;
  abstract getPostsByUserId(userId: number): Promise<PostEntity[]>;
  abstract create(data: CreatePostDto): Promise<PostEntity>;
  abstract update(id: number, data: UpdatePostDto): Promise<PostEntity | null>;
  abstract delete(id: number): Promise<PostEntity | null>;
}

@Injectable()
export class PostsServiceImpl implements PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async getPostById(id: number): Promise<PostEntity> {
    const output = await this.postsRepository.getPostById(id);

    return output;
  }

  async getPostsByUserId(userId: number): Promise<PostEntity[]> {
    const output = await this.postsRepository.getPostsByUserId(userId);

    return output;
  }

  async create(data: CreatePostDto): Promise<PostEntity> {
    const output = await this.postsRepository.create(data);

    return output;
  }

  async update(id: number, data: UpdatePostDto): Promise<PostEntity> {
    const output = await this.postsRepository.update(id, data);

    return output;
  }

  async delete(id: number): Promise<PostEntity> {
    const output = await this.postsRepository.delete(id);

    return output;
  }
}
