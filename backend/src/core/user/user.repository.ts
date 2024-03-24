import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UserData, UserEntity } from './user.entity';
import { FirebaseService } from 'src/firebase/firebase.service';

export abstract class UserRepository {
  abstract getUserById(id: number): Promise<UserEntity | null>;
  abstract getUserByEmail(email: string): Promise<UserEntity | null>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract create(user: UserData): Promise<UserEntity>;
  abstract update(id: number, user: UserData): Promise<UserEntity | null>;
}

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private prisma: PrismaService, private firebaseService: FirebaseService) {}

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

  async create(user: UserData): Promise<UserEntity> {
    let userReturn: UserEntity;

    await this.prisma.$transaction(async (tx) => {
      await this.firebaseService.createUser(user.email, user.password);
      userReturn = await tx.user.create({
        data: user,
      })
    });
    return userReturn;
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
}
