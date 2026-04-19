import { useState, useEffect } from 'react';
import type { Article, CreateArticleRequest } from '@/types/article';
import { articleService } from '@/services/articleService';
import { FALLBACK_ARTICLES } from '@/constants/fallbackArticles';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await articleService.getArticles();
      setArticles(response.data?.length ? response.data : FALLBACK_ARTICLES);
    } catch {
      setArticles(FALLBACK_ARTICLES);
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (articleData: CreateArticleRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await articleService.createArticle(articleData);
      setArticles(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create article');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateArticle = async (id: string, articleData: Partial<CreateArticleRequest>) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await articleService.updateArticle(id, articleData);
      setArticles(prev => prev.map(a => (a.id === id ? updated : a)));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update article');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await articleService.deleteArticle(id);
      setArticles(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete article');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return { articles, loading, error, fetchArticles, createArticle, updateArticle, deleteArticle };
};

export const useArticle = (id: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    articleService
      .getArticleById(id)
      .then(setArticle)
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to fetch article'))
      .finally(() => setLoading(false));
  }, [id]);

  return { article, loading, error };
};
