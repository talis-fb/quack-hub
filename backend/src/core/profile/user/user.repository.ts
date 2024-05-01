import { Injectable, Provider } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserData, UserEntity } from './user.entity';

export abstract class UserRepository {
  abstract getUserById(id: number): Promise<UserEntity | void>;
  abstract getUserByEmail(email: string): Promise<UserEntity | void>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract findUsers(ids: number[]): Promise<UserEntity[]>;
  abstract searchUsers(searchName: string): Promise<UserEntity[]>;
  abstract findFollowers(id: number): Promise<UserEntity[]>;
  abstract findFollowing(id: number): Promise<UserEntity[]>;
  abstract checkUsersExists(id: number[]): Promise<boolean>;

  abstract update(id: number, user: Partial<UserData>): Promise<UserEntity>;
  abstract addFollower(
    userFollowingId: number,
    userToBeFollowedId: number,
  ): Promise<void>;
  abstract removeFollower(
    userFollowingId: number,
    userToBeFollowedId: number,
  ): Promise<void>;
}

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: number): Promise<UserEntity | void> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        following: true,
        followedBy: true,
      },
    });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany();
  }

  async update(id: number, user: Partial<UserData>): Promise<UserEntity> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...user,
      },
      include: {
        following: true,
        followedBy: true,
      },
    });
  }

  async findFollowers(id: number): Promise<UserEntity[]> {
    return await this.prisma.user.findMany({
      where: {
        following: {
          some: {
            id,
          },
        },
      },
    });
  }

  async findFollowing(id: number): Promise<UserEntity[]> {
    return await this.prisma.user.findMany({
      where: {
        followedBy: {
          some: {
            id,
          },
        },
      },
    });
  }

  async addFollower(
    userFollowingId: number,
    userToBeFollowedId: number,
  ): Promise<void> {
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
  }

  async findUsers(ids: number[]): Promise<UserEntity[]> {
    return await this.prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async searchUsers(searchName: string): Promise<UserEntity[]> {
    return await this.prisma.user.findMany({
      where: {
        name: {
          contains: searchName,
          mode: 'insensitive',
        },
      },
    });
  }

  async checkUsersExists(ids: number[]): Promise<boolean> {
    const countUsers = await this.prisma.user.count({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return countUsers === ids.length;
  }

  async removeFollower(
    userFollowingId: number,
    userToBeFollowedId: number,
  ): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: userFollowingId,
      },
      data: {
        following: {
          disconnect: {
            id: userToBeFollowedId,
          },
        },
      },
    });
  }
}

export const UserRepositoryProvider: Provider = {
  provide: UserRepository,
  useClass: UserRepositoryImpl,
};
