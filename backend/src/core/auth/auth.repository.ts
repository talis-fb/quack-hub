import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UserEntity } from '../user/user.entity';
import { AuthUserData } from './login/dtos/auth-user.dto';

export abstract class AuthRepository {
  abstract createAuthUser(user: AuthUserData): Promise<UserEntity>;
  abstract findAuthUser(email: string, password: string): Promise<UserEntity | null>;
}

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(private prisma: PrismaService) {}

  async createAuthUser(user: AuthUserData): Promise<UserEntity> {
    return await this.prisma.$transaction(async (tx) => {
      const { password, ...userData } = user;

      const userCreated = await tx.user.create({
        data: {
          ...userData,
        },
      });

      await tx.user.update({
        where: {
          id: userCreated.id,
        },
        data: {
          auth: {
            create: {
              password,
            },
          },
        },
      });

      return userCreated;
    });
  }
  async findAuthUser(email: string, password: string): Promise<UserEntity | null> {
    const userSaved = await this.prisma.user.findUnique({
      where: {
        email,
        auth: {
          password
        }
      },
      include: {
        auth: true,
      },
    });

    if(userSaved?.auth?.password !== password) {
      return null;
    }

    return userSaved;
  }
}
