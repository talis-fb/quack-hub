import { Injectable, Provider } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserData, UserEntity } from 'src/core/profile/user/user.entity';
import { UserNotFoundException } from 'src/core/profile/user/user.exceptions';

export abstract class UserService {
  public abstract getUserById(id: number): Promise<UserEntity>;
  public abstract getUserByEmail(email: string): Promise<UserEntity>;
  public abstract findAll(): Promise<UserEntity[]>;
  public abstract findUsersByIds(ids: number[]): Promise<UserEntity[]>;
  public abstract search(searchName: string): Promise<UserEntity[]>;
  public abstract update(
    id: number,
    user: Partial<UserData>,
  ): Promise<UserEntity>;
  public abstract follow(
    userFollowingId: number,
    userToBeFollowedId: number,
  ): Promise<void>;
  public abstract getFollowers(id: number): Promise<UserEntity[]>;
  public abstract getFollowing(id: number): Promise<UserEntity[]>;
}

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(private repo: UserRepository) {}

  public async findAll(): Promise<UserEntity[]> {
    return await this.repo.findAll();
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.repo.getUserByEmail(email);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  public async getUserById(id: number): Promise<UserEntity> {
    const user = await this.repo.getUserById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  public async search(searchName: string): Promise<UserEntity[]> {
    return await this.repo.searchUsers(searchName);
  }

  public async update(
    id: number,
    user: Partial<UserData>,
  ): Promise<UserEntity> {
    const userToUpdate = await this.repo.getUserById(id);
    if (!userToUpdate) {
      throw new UserNotFoundException();
    }
    return await this.repo.update(id, user);
  }

  public async follow(
    userFollowingId: number,
    userToBeFollowedId: number,
  ): Promise<void> {
    return await this.repo.addFollower(userFollowingId, userToBeFollowedId);
  }

  public async findUsersByIds(ids: number[]): Promise<UserEntity[]> {
    return await this.repo.findUsers(ids);
  }

  public async getFollowers(id: number): Promise<UserEntity[]> {
    return await this.repo.findFollowers(id);
  }

  public async getFollowing(id: number): Promise<UserEntity[]> {
    return await this.repo.findFollowing(id);
  }
}

export const UserServiceProvider: Provider = {
  provide: UserService,
  useClass: UserServiceImpl,
}