// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  user?: LoginResponse['user'];
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

// Request Types
export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
  }
  
/**
 * Authentication Service
 * Handles all API calls relted to user auth
 */
class AuthService {
    /**
     * Helper methon to make auth requests
     */
    private async MakeRequest<T>(endpoint: string, options: RequestInit = {}) : Promise<T> {
        const token = localStorage.getItem("auth_token")

        const config: RequestInit = {
            headers: {
                "Content-Type" : "application/json",
                ...(token && {Authorization: `Bearer ${token}`}),
                ...options.headers
            },
            ...options,
        };
        
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
            const data = await response.json();

            // Handle HTTP errors
            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }
            return data
        } catch (error) {
            console.error(`API Error for ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Login user
     */
    async login(credentials:LoginRequest) : Promise<LoginResponse> {
        return this.MakeRequest<LoginResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
        });
    }

   /**
   * Register new user
   */
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    return this.MakeRequest<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<ProfileResponse> {
    return this.MakeRequest<ProfileResponse>('/auth/profile', {
      method: 'GET',
    });
  }

  /**
   * Change user password
   */
  async changePassword(passwordData: ChangePasswordRequest): Promise<ApiResponse> {
    return this.MakeRequest<ApiResponse>('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  }

  /**
   * Refresh token (if implementing token refresh)
   */
  async refreshToken(): Promise<LoginResponse> {
    return this.MakeRequest<LoginResponse>('/auth/refresh', {
      method: 'POST',
    });
  }

  /**
   * Logout user (client-side cleanup)
   */
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }
}

export const authService = new AuthService();
export default authService;