import { UserEntity } from 'src/core/profile/user/user.entity';

export class CommentData {
  content: string;
  userId: number;
  postId: number;
}

export class CommentEntity extends CommentData {
  id: number;

  createdAt: Date;
  updatedAt: Date;
}

export class CommentEntityWithUser extends CommentEntity {
  User: UserEntity;
}
