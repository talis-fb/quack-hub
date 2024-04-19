import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserData, UserEntity } from './user.entity';
import { RepositoryClientKnownRequestException } from 'src/excpetions/repository/RepositoryClientKnownRequestException';
import { ServiceClientKnownRequestException } from 'src/excpetions/service/ServiceClientKnownRequestException';
import { RepositoryClientValidationException } from 'src/excpetions/repository/RepositoryClientValidationException';
import { ServiceClientValidationException } from 'src/excpetions/service/ServiceClientValidationException';
import { RepositoryClientInitializationException } from 'src/excpetions/repository/RepositoryClientInitializationException';
import { ServiceClientInitializationException } from 'src/excpetions/service/ServiceClientInitializationException';
import { ServiceException } from 'src/excpetions/service/ServiceException';

export abstract class UserService {
  public abstract getUserById(id: number): Promise<UserEntity | null>;
  public abstract getUserByEmail(email: string): Promise<UserEntity | null>;
  public abstract findAll(): Promise<UserEntity[]>;
  public abstract findUsersByIds(ids: number[]): Promise<UserEntity[]>;
  public abstract search(searchName: string): Promise<UserEntity[]>;
  public abstract update(
    id: number,
    user: Partial<UserData>,
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
    try {
      return await this.repo.findAll();
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }

  public async getUserByEmail(email: string): Promise<UserEntity | null> {
    try {
      const resUser = await this.repo.getUserByEmail(email);
      return resUser;
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }

  public async getUserById(id: number): Promise<UserEntity | null> {
    try {
      const resUser = await this.repo.getUserById(id);
      return resUser;
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }

  public async search(searchName: string): Promise<UserEntity[]> {
    try {
      return await this.repo.searchUsers(searchName);
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }

  public async update(
    id: number,
    user: Partial<UserData>,
  ): Promise<UserEntity | null> {
    try {
      return await this.repo.update(id, user);
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }

  public async follow(
    userFollowingId: number,
    userToBeFollowedId: number,
  ): Promise<void> {
    try {
      return await this.repo.addFollower(userFollowingId, userToBeFollowedId);
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }

  public async findUsersByIds(ids: number[]): Promise<UserEntity[]> {
    try {
      return await this.repo.findUsers(ids);
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }

  public async getFollowers(id: number): Promise<UserEntity[]> {
    try {
      return await this.repo.getFollowers(id);
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }

  public async getFollowing(id: number): Promise<UserEntity[]> {
    try {
      return await this.repo.getFollowing(id);
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }
}
