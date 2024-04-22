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
