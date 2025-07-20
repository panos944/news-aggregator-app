// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';

/**
 * General API Service
 * Handles all non-authentication API calls
 */
class ApiService {
  
  /**
   * Helper method to make requests with optional authentication
   */
  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('auth_token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      // Handle different content types
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      
      // Handle HTTP errors
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Get latest articles
   */
  async getLatestArticles(limit?: number): Promise<any[]> {
    const endpoint = limit ? `/articles/latest?limit=${limit}` : '/articles/latest';
    return this.makeRequest<any[]>(endpoint);
  }

  /**
   * Get articles by source
   */
  async getArticlesBySource(sourceName: string): Promise<any[]> {
    return this.makeRequest<any[]>(`/articles/${encodeURIComponent(sourceName)}`);
  }

  /**
   * Get articles grouped by sources
   */
  async getArticlesBySourcesGrouped(): Promise<{ [key: string]: any[] }> {
    return this.makeRequest<{ [key: string]: any[] }>('/articles/by-sources');
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;