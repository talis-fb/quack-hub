import { UserData, UserEntity } from '../user.entity';

export abstract class UserService {
  public abstract getUserById(id: number): Promise<UserEntity | null>;

  public abstract getUserByEmail(email: string): Promise<UserEntity | null>;

  public abstract findAll(): Promise<UserEntity[]>;

  public abstract create(user: UserData): Promise<UserEntity>;

  public abstract update(
    id: number,
    user: UserData,
  ): Promise<UserEntity | null>;
}
