import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../user.repository';
import { UserData, UserEntity } from '../../user.entity';
import { UserService } from '../user.service';

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

  public async create(user: UserData): Promise<UserEntity> {
    return await this.repo.create(user);
  }

  public async update(id: number, user: UserData): Promise<UserEntity | null> {
    return await this.repo.update(id, user);
  }
}
