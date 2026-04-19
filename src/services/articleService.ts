import type { Article, ArticlesResponse, CreateArticleRequest, CreateArticleResponse } from '@/types/article';

const API_BASE = import.meta.env.VITE_API_URL ?? 'https://cbc-hackaton-urcst-bn.onrender.com/api';

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const articleService = {
  async getArticles(): Promise<ArticlesResponse> {
    const res = await fetch(`${API_BASE}/admin/articles`, {
      headers: authHeaders(),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async getArticleById(id: string): Promise<Article> {
    const res = await fetch(`${API_BASE}/admin/articles/${id}`, {
      headers: authHeaders(),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.data ?? data;
  },

  async createArticle(articleData: CreateArticleRequest): Promise<CreateArticleResponse> {
    const res = await fetch(`${API_BASE}/admin/articles`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(articleData),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async updateArticle(id: string, articleData: Partial<CreateArticleRequest>): Promise<Article> {
    const res = await fetch(`${API_BASE}/admin/articles/${id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(articleData),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.data ?? data;
  },

  async deleteArticle(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/articles/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  },
};
