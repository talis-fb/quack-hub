import { Injectable, Provider } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  InputUserData,
  UserData,
  UserEntity,
  UserEntityWithMethodologies,
} from './user.entity';

export abstract class UserRepository {
  abstract getUserById(id: number): Promise<UserEntityWithMethodologies | void>;
  abstract getUserByEmail(email: string): Promise<UserEntity | void>;
  abstract findAll(): Promise<UserEntityWithMethodologies[]>;
  abstract findUsers(ids: number[]): Promise<UserEntityWithMethodologies[]>;
  abstract searchUsers(
    searchName: string,
  ): Promise<UserEntityWithMethodologies[]>;
  abstract findFollowers(id: number): Promise<UserEntityWithMethodologies[]>;
  abstract findFollowing(id: number): Promise<UserEntityWithMethodologies[]>;
  abstract checkUsersExists(id: number[]): Promise<boolean>;

  abstract update(
    id: number,
    user: Partial<InputUserData>,
  ): Promise<UserEntityWithMethodologies>;
  abstract addFollower(
    userFollowingId: number,
    userToBeFollowedId: number,
  ): Promise<void>;
  abstract removeFollower(
    userFollowingId: number,
    userToBeFollowedId: number,
  ): Promise<void>;
  abstract findFollow(
    userFollowingId: number,
    userToBeFollowedId: number,
  ): Promise<UserEntityWithMethodologies>;
}

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: number): Promise<UserEntityWithMethodologies | void> {
    const output = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        following: true,
        followedBy: true,
        methodologies: {
          include: {
            Methodologie: true,
          },
        },
      },
    });

    return {
      ...output,
      methodologies: output.methodologies.map(
        (methodologie) => methodologie.Methodologie,
      ),
    };
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const output = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return output;
  }

  async findAll(): Promise<UserEntityWithMethodologies[]> {
    const output = await this.prisma.user.findMany({
      include: {
        methodologies: {
          include: {
            Methodologie: true,
          },
        },
      },
    });

    return output.map((el) => ({
      ...el,
      methodologies: el.methodologies.map((el) => el.Methodologie),
    }));
  }

  async update(
    id: number,
    user: Partial<InputUserData>,
  ): Promise<UserEntityWithMethodologies> {
    const { methodologies, ...rest } = user;
    const output = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...user,
        methodologies: {
          deleteMany: {},
          create: methodologies.map((el) => ({
            Methodologie: {
              connect: {
                id: el.id,
              },
            },
          })),
        },
      },
      include: {
        following: true,
        followedBy: true,
        methodologies: {
          include: {
            Methodologie: true,
          },
        },
      },
    });

    return {
      ...output,
      methodologies: output.methodologies.map(
        (methodologie) => methodologie.Methodologie,
      ),
    };
  }

  async findFollowers(id: number): Promise<UserEntityWithMethodologies[]> {
    const output = await this.prisma.user.findMany({
      where: {
        following: {
          some: {
            id,
          },
        },
      },
      include: {
        methodologies: {
          include: {
            Methodologie: true,
          },
        },
      },
    });

    return output.map((el) => ({
      ...el,
      methodologies: el.methodologies.map((el) => el.Methodologie),
    }));
  }

  async findFollowing(id: number): Promise<UserEntityWithMethodologies[]> {
    const output = await this.prisma.user.findMany({
      where: {
        followedBy: {
          some: {
            id,
          },
        },
      },
      include: {
        methodologies: {
          include: {
            Methodologie: true,
          },
        },
      },
    });

    return output.map((el) => ({
      ...el,
      methodologies: el.methodologies.map((el) => el.Methodologie),
    }));
  }

  async addFollower(
    userFollowingId: number,
    userToBeFollowedId: number,
  ): Promise<void> {
    const output = await this.prisma.user.update({
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

  async findUsers(ids: number[]): Promise<UserEntityWithMethodologies[]> {
    const output = await this.prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        methodologies: {
          include: {
            Methodologie: true,
          },
        },
      },
    });

    return output.map((el) => ({
      ...el,
      methodologies: el.methodologies.map((el) => el.Methodologie),
    }));
  }

  async searchUsers(
    searchName: string,
  ): Promise<UserEntityWithMethodologies[]> {
    const output = await this.prisma.user.findMany({
      where: {
        name: {
          contains: searchName,
          mode: 'insensitive',
        },
      },
      include: {
        methodologies: {
          include: {
            Methodologie: true,
          },
        },
      },
    });

    return output.map((el) => ({
      ...el,
      methodologies: el.methodologies.map((el) => el.Methodologie),
    }));
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

  async findFollow(
    userFollowingId: number,
    userToBeFollowedId: number,
  ): Promise<UserEntityWithMethodologies> {
    const output = await this.prisma.user.findUnique({
      where: {
        id: userFollowingId,
        following: {
          some: {
            id: userToBeFollowedId,
          },
        },
      },
      include: {
        methodologies: {
          include: {
            Methodologie: true,
          },
        },
      },
    });

    return {
      ...output,
      methodologies: output.methodologies.map(
        (methodologie) => methodologie.Methodologie,
      ),
    };
  }
}

export const UserRepositoryProvider: Provider = {
  provide: UserRepository,
  useClass: UserRepositoryImpl,
};
