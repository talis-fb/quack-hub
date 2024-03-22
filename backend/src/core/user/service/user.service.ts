import { UserData, UserEntity } from '../user.entity';

export abstract class UserService {
  public abstract get(id: number): Promise<UserEntity | null>;

  public abstract create(user: UserData): Promise<UserEntity>;

  public abstract update(
    id: number,
    user: UserData,
  ): Promise<UserEntity | null>;
}
