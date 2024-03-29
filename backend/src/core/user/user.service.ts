import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserData, UserEntity } from './user.entity';
import { UserDto } from './dtos/user-dto';

export abstract class UserService {
  public abstract getUserById(id: number): Promise<UserEntity | null>;

  public abstract getUserByEmail(email: string): Promise<UserEntity | null>;

  public abstract findAll(): Promise<UserEntity[]>;

  public abstract create(user: UserDto): Promise<UserEntity>;

  public abstract update(
    id: number,
    user: UserData,
  ): Promise<UserEntity | null>;

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
    return await this.repo.getUserByEmail(email);
  }

  public async getUserById(id: number): Promise<UserEntity | null> {
    return await this.repo.getUserById(id);
  }

  public async create(user: UserDto): Promise<UserEntity> {
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
