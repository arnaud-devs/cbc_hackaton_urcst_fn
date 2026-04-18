export interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  views: number;
  createdAt: string;
  admin: { name: string };
}

export interface ArticlesResponse {
  status: string;
  data: Article[];
}

export interface CreateArticleRequest {
  title: string;
  content: string;
  category: string;
}

export interface CreateArticleResponse {
  status: string;
  data: Article;
}
