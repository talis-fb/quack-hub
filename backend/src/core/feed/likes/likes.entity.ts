import { IsInt } from 'class-validator';

export class LikesData {
  @IsInt()
  postId: number;

  @IsInt()
  userId: number;
}

export class LikesEntity extends LikesData {
  @IsInt()
  id: number;
}
