export interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  coverPhoto: string;
  status: "DRAFT" | "PUBLISHED";
  views: number;
  createdAt: string;
  admin: { name: string };
  ArticleCategories: { id: string; title: string }[];
}

export interface ArticlesResponse {
  status: string;
  data: Article[];
}

export interface CreateArticleRequest {
  title: string;
  content: string;
  category?: string;
  coverPhoto?: string;
  status?: "DRAFT" | "PUBLISHED";
  categories?: string[];
}

export interface CreateArticleResponse {
  status: string;
  data: Article;
}
