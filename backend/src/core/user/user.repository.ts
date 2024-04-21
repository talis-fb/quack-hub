import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UserData, UserEntity } from './user.entity';
import { RepositoryClientKnownRequestException } from 'src/excpetions/repository/RepositoryClientKnownRequestException';
import { RepositoryClientValidationException } from 'src/excpetions/repository/RepositoryClientValidationException';
import { RepositoryClientInitializationException } from 'src/excpetions/repository/RepositoryClientInitializationException';
import { RepositoryException } from 'src/excpetions/repository/RepositoryException';

export abstract class UserRepository {
  abstract getUserById(id: number): Promise<UserEntity | null>;
  abstract getUserByEmail(email: string): Promise<UserEntity | null>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract findUsers(ids: number[]): Promise<UserEntity[]>;
  abstract searchUsers(searchName: string): Promise<UserEntity[]>;
  abstract getFollowers(id: number): Promise<UserEntity[]>;
  abstract getFollowing(id: number): Promise<UserEntity[]>;

  abstract update(
    id: number,
    user: Partial<UserData>,
  ): Promise<UserEntity | null>;
  abstract addFollower(
    userFollowingId: number,
    userToBeFollowedId: number,
  ): Promise<void>;
}

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: number): Promise<UserEntity | null> {
    try {
      const output = await this.prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          _count: {
            select: { following: true, followedBy: true },
          },
        },
      });
      return output;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during search of user with ID ${id}!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during search of user with ID ${id}!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during search of user with ID ${id}!`,
        );
      }
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    try {
      const output = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      return output;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during search of user with email ${email}!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during search of user with email ${email}!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during search of user with email ${email}!`,
        );
      }
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const output = await this.prisma.user.findMany();

      return output;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during search of all users!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during search of all users!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during search of all users!`,
        );
      }
    }
  }

  async update(
    id: number,
    user: Partial<UserData>,
  ): Promise<UserEntity | null> {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...user,
        },
        include: {
          _count: {
            select: { following: true, followedBy: true },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during update of user with ID ${id}!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during update of user with ID ${id}!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during update of user with ID ${id}!`,
        );
      }
    }
  }

  async getFollowers(id: number): Promise<UserEntity[]> {
    try {
      return await this.prisma.user.findMany({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during search of follows of user with ID ${id}!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during search of follows of user with ID ${id}!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during search of follows of user with ID ${id}!`,
        );
      }
    }
  }

  async getFollowing(id: number): Promise<UserEntity[]> {
    try {
      return await this.prisma.user.findMany({
        where: {
          followedBy: {
            some: {
              id,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during search of following of user with ID ${id}!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during search of following of user with ID ${id}!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during search of following of user with ID ${id}!`,
        );
      }
    }
  }

  async addFollower(
    userFollowingId: number,
    userToBeFollowedId: number,
  ): Promise<void> {
    try {
      await this.prisma.user.update({
        where: {
          id: userFollowingId,
        },
        data: {
          following: {
            connect: {
              id: userToBeFollowedId,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during follow user with ID ${userToBeFollowedId}!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during follow user with ID ${userToBeFollowedId}!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during follow user with ID ${userToBeFollowedId}!`,
        );
      }
    }
  }

  async findUsers(ids: number[]): Promise<UserEntity[]> {
    try {
      return await this.prisma.user.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during search of users!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during search of users!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during search of users!`,
        );
      }
    }
  }

  async searchUsers(searchName: string): Promise<UserEntity[]> {
    try {
      return await this.prisma.user.findMany({
        where: {
          name: {
            contains: searchName,
            mode: 'insensitive',
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during search of user with name ${searchName}!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during search of user with name ${searchName}!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during search of user with name ${searchName}!`,
        );
      }
    }
  }
}
