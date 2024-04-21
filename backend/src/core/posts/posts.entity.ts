export class PostData {
  title: string;
  content: string;
  _count: {
    likes: number;
    comments: number;
  };
}

export class PostEntity extends PostData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
