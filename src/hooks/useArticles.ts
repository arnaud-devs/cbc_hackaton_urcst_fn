import { useState, useEffect } from 'react';
import type { Article, CreateArticleRequest } from '@/types/article';
import { articleService } from '@/services/articleService';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await articleService.getArticles();
      setArticles(response.data);
      
      // Check if we're using mock data
      const isMockData = response.message.includes('mock data') || 
                        response.data.every(article => article.id.startsWith('mock-'));
      setIsUsingMockData(isMockData);
      
      if (isMockData) {
        console.warn('Using mock data - API may be unavailable');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      setIsUsingMockData(false);
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
      const updatedArticle = await articleService.updateArticle(id, articleData);
      setArticles(prev => prev.map(article => 
        article.id === id ? updatedArticle : article
      ));
      return updatedArticle;
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
      setArticles(prev => prev.filter(article => article.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete article');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchArticles = async (query: string) => {
    if (!query.trim()) {
      fetchArticles();
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const response = await articleService.searchArticles(query);
      setArticles(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    loading,
    error,
    isUsingMockData,
    fetchArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    searchArticles,
  };
};

export const useArticle = (id: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticle = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const articleData = await articleService.getArticleById(id);
      setArticle(articleData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch article');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  return {
    article,
    loading,
    error,
    refetch: fetchArticle,
  };
};
