import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserData, UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private repo: UserRepository) {}

  public async get(id: number): Promise<UserEntity | null> {
    return await this.repo.get(id);
  }

  public async create(user: UserData): Promise<UserEntity> {
    return await this.repo.create(user);
  }

  public async update(id: number, user: UserData): Promise<UserEntity | null> {
    return await this.repo.update(id, user);
  }

  public async follow(
    userFollowingId: number,
    userToBeFollowedId: number,
  ): Promise<void> {
    return await this.repo.addFollower(userFollowingId, userToBeFollowedId);
  }

  public async getFollowers(id: number): Promise<UserEntity[]> {
    return await this.repo.getFollowers(id);
  }

  public async getFollowing(id: number): Promise<UserEntity[]> {
    return await this.repo.getFollowing(id);
  }
}
