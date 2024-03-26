import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UserData, UserEntity } from './user.entity';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserDto } from './dtos/user-dto';

export abstract class UserRepository {
  abstract getUserById(id: number): Promise<UserEntity | null>;
  abstract getUserByEmail(email: string): Promise<UserEntity | null>;
  abstract findAll(): Promise<UserEntity[]>;
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
  constructor(
    private prisma: PrismaService,
    private firebaseService: FirebaseService,
  ) {}

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

  async create(user: UserDto): Promise<UserEntity> {
    const { password, ...userRemainder } = user;

    return await this.prisma.$transaction(async (tx) => {
      await this.firebaseService.createUser(user.email, user.password);

      const newUser = await tx.user.create({
        data: {
          ...userRemainder,
        },
      });

      return newUser;
    });
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
