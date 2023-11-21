export interface IPost extends TimeStamp {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  category: ICategory;
}

export interface ICategory extends TimeStamp {
  id: number;
  name: string;
  posts: IPost[];
}

interface TimeStamp {
  createdAt: string;
  updatedAt: string;
}
