import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UserData, UserEntity } from './user.entity';

export abstract class UserRepository {
  abstract get(id: number): Promise<UserEntity | null>;
  abstract create(user: UserData): Promise<UserEntity>;
  abstract update(id: number, user: UserData): Promise<UserEntity | null>;
  abstract addFollower(
    userFollowingId: number,
    userToBeFollowedId: number,
  ): Promise<void>;
  abstract getFollowers(id: number): Promise<UserEntity[]>;
  abstract getFollowing(id: number): Promise<UserEntity[]>;
}

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: UserData): Promise<UserEntity> {
    const created = await this.prisma.user.create({
      data: {
        ...user,
      },
    });

    return created;
  }

  async get(id: number): Promise<UserEntity | null> {
    const output = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    console.log(output);
    return output;
  }

  async update(id: number, user: UserData): Promise<UserEntity | null> {
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
