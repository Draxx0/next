// POSTS

export interface IPost extends TimeStamp {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  category: ICategory;
}

export interface IPostCreate {
  title: string;
  content: string;
  categoryId: number;
}

// CATEGORIES

export interface ICategory extends TimeStamp {
  id: number;
  name: string;
  posts: IPost[];
}

export interface ICategoryCreate {
  name: string;
}

interface TimeStamp {
  createdAt: string;
  updatedAt: string;
}

export interface Query {
  orderBy?: "asc" | "desc";
  categoryId?: string;
}
