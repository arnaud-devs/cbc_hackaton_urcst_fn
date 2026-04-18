export interface ArticleCategory {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  title: string;
  coverPhoto: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
  ArticleCategories: ArticleCategory[];
}

export interface ArticlesResponse {
  status: string;
  message: string;
  data: Article[];
}

export interface CreateArticleRequest {
  title: string;
  coverPhoto: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED';
  categories: string[];
}

export interface CreateArticleResponse {
  status: string;
  message: string;
  data: Article;
}
