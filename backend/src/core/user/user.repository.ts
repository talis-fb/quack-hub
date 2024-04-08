import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UserData, UserEntity } from './user.entity';

export abstract class UserRepository {
  abstract getUserById(id: number): Promise<UserEntity | null>;
  abstract getUserByEmail(email: string): Promise<UserEntity | null>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract findUsers(searchName: string): Promise<UserEntity[]>;
  abstract getFollowers(id: number): Promise<UserEntity[]>;
  abstract getFollowing(id: number): Promise<UserEntity[]>;

  abstract update(id: number, user: Partial<UserData>): Promise<UserEntity | null>;
  abstract addFollower(
    userFollowingId: number,
    userToBeFollowedId: number,
  ): Promise<void>;
}

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findUsers(searchName: string): Promise<UserEntity[]> {
    return await this.prisma.user.findMany({
      where: {
        name: {
          contains: searchName,
          mode: 'insensitive',
        },
      },
    });
  }

  async getUserById(id: number): Promise<UserEntity | null> {
    const output = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return output;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const output = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return output;
  }

  async findAll(): Promise<UserEntity[]> {
    const output = await this.prisma.user.findMany();

    return output;
  }

  async update(id: number, user: Partial<UserData>): Promise<UserEntity | null> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...user,
      },
    });
  }

  async getFollowers(id: number): Promise<UserEntity[]> {
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

  async getFollowing(id: number): Promise<UserEntity[]> {
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
}
