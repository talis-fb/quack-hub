export class PostData {
  title: string;
  content: string;
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
