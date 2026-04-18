import type { Article, ArticlesResponse, CreateArticleRequest, CreateArticleResponse } from '@/types/article';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/';
const mockArticles: Article[] = [
  {
    id: "mock-1",
    title: "Understanding COVID-19 Prevention",
    coverPhoto: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop",
    content: "COVID-19 prevention is crucial for maintaining public health. This article covers essential practices including proper hand hygiene, mask-wearing, social distancing, and vaccination. Understanding these measures can significantly reduce the risk of transmission and protect vulnerable populations. Regular updates from health authorities and following local guidelines are essential for effective prevention strategies.",
    status: "PUBLISHED",
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z",
    ArticleCategories: [
      { id: "cat-1", title: "health", createdAt: "2024-01-15T10:00:00.000Z", updatedAt: "2024-01-15T10:00:00.000Z" },
      { id: "cat-2", title: "COVID-19", createdAt: "2024-01-15T10:00:00.000Z", updatedAt: "2024-01-15T10:00:00.000Z" }
    ]
  },
  {
    id: "mock-2",
    title: "Mental Health During Challenging Times",
    coverPhoto: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
    content: "Mental health is just as important as physical health, especially during challenging periods. This article explores strategies for maintaining mental wellness, including stress management techniques, the importance of social connections, and when to seek professional help. Building resilience and practicing self-care are key components of mental health maintenance.",
    status: "PUBLISHED",
    createdAt: "2024-01-14T14:30:00.000Z",
    updatedAt: "2024-01-14T14:30:00.000Z",
    ArticleCategories: [
      { id: "cat-3", title: "mental-health", createdAt: "2024-01-14T14:30:00.000Z", updatedAt: "2024-01-14T14:30:00.000Z" },
      { id: "cat-4", title: "wellness", createdAt: "2024-01-14T14:30:00.000Z", updatedAt: "2024-01-14T14:30:00.000Z" }
    ]
  },
  {
    id: "mock-3",
    title: "Nutrition and Immune System Support",
    coverPhoto: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
    content: "Proper nutrition plays a vital role in supporting a healthy immune system. This article discusses essential vitamins and minerals, the importance of a balanced diet, and foods that can help boost immunity. Understanding the connection between nutrition and immune function can help individuals make informed dietary choices for better health outcomes.",
    status: "PUBLISHED",
    createdAt: "2024-01-13T09:15:00.000Z",
    updatedAt: "2024-01-13T09:15:00.000Z",
    ArticleCategories: [
      { id: "cat-5", title: "nutrition", createdAt: "2024-01-13T09:15:00.000Z", updatedAt: "2024-01-13T09:15:00.000Z" },
      { id: "cat-6", title: "immune-system", createdAt: "2024-01-13T09:15:00.000Z", updatedAt: "2024-01-13T09:15:00.000Z" }
    ]
  }
];

const getMockResponse = (): ArticlesResponse => ({
  status: "success",
  message: "Articles retrieved successfully (using mock data)",
  data: mockArticles
});

export const articleService = {
  // Fetch all articles
  async getArticles(): Promise<ArticlesResponse> {
    try {
      const response = await fetch(`${baseUrl}article`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      const data: ArticlesResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      
      // Provide more specific error messages
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return getMockResponse();
      }
      
      if (error instanceof Error && error.name === 'AbortError') {
        return getMockResponse();
      }
      return getMockResponse();
    }
  },

  // Fetch a single article by ID
  async getArticleById(id: string): Promise<Article> {
    try {
      const response = await fetch(`${baseUrl}article/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Error fetching article ${id}:`, error);
      
      // Fallback to mock data
      const mockArticle = mockArticles.find(article => article.id === id);
      if (mockArticle) {
        console.warn(`Using mock data for article ${id}`);
        return mockArticle;
      }
      
      // If no mock article found, throw error
      throw new Error(`Article with ID ${id} not found`);
    }
  },

  // Create a new article
  async createArticle(articleData: CreateArticleRequest): Promise<CreateArticleResponse> {
    try {
      // Debug: log outgoing payload
      const response = await fetch(`${baseUrl}article`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        // Controller wraps req.body as { data }, so send raw payload here
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: CreateArticleResponse = await response.json();
      console.log('[articleService.createArticle] Response body:', data);
      return data;
    } catch (error) {
      console.error('[articleService.createArticle] Error creating article:', error);
      throw error;
    }
  },

  // Update an existing article
  async updateArticle(id: string, articleData: Partial<CreateArticleRequest>): Promise<Article> {
    try {
      const response = await fetch(`${baseUrl}article/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(articleData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete an article
  async deleteArticle(id: string): Promise<void> {
    try {
      const response = await fetch(`${baseUrl}article/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  },

  // Search articles by title or content
  async searchArticles(query: string): Promise<ArticlesResponse> {
    try {
      const response = await fetch(`${baseUrl}/article/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ArticlesResponse = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get articles by category
  async getArticlesByCategory(categoryId: string): Promise<ArticlesResponse> {
    try {
      const response = await fetch(`${baseUrl}/article/category/${categoryId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ArticlesResponse = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
};
