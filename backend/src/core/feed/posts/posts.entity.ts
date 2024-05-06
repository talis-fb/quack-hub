import { UserEntity } from 'src/core/profile/user/user.entity';

export class PostData {
  title: string;
  content: string;
  imageUrl: string | null;
}

export class PostEntity extends PostData {
  id: number;

  _count: {
    likes: number;
    comments: number;
  };

  createdAt: Date;
  updatedAt: Date;
}

export class PostEntityWithUser extends PostEntity {
  User: UserEntity;
}
