import User, { IUser } from '../models/User';
import { generateToken } from '../utils/jwt.utils';

// Data Transfer Objects (DTOs) for clean data passing
export interface RegisterDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  token?: string;
}

class AuthService {
  /**
   * Register a new user
   */
  async register(userData: RegisterDTO): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        return {
          success: false,
          message: 'User with this email already exists'
        };
      }

      // Create new user (password will be hashed by pre-save middleware)
      const newUser = new User(userData);
      await newUser.save();

      // Generate JWT token
      const token = generateToken(newUser);

      // Return user data (excluding password)
      return {
        success: true,
        message: 'User registered successfully',
        user: {
          id: (newUser._id as any).toString(),
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role
        },
        token
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'Registration failed. Please try again.'
      };
    }
  }

  /**
   * Login an existing user
   */
  async login(credentials: LoginDTO): Promise<AuthResponse> {
    try {
      // Find user by email
      const user = await User.findOne({ email: credentials.email });
      
      if (!user) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      // Check if user is active
      if (!user.isActive) {
        return {
          success: false,
          message: 'Account is disabled. Please contact support.'
        };
      }

      // Verify password using the instance method we defined
      const isPasswordValid = await user.comparePassword(credentials.password);
      
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      // Generate JWT token
      const token = generateToken(user);

      return {
        success: true,
        message: 'Login successful',
        user: {
          id: (user._id as any).toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        },
        token
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Login failed. Please try again.'
      };
    }
  }

  /**
   * Get user profile by ID
   */
  async getUserProfile(userId: string): Promise<{ success: boolean; user?: any; message: string }> {
    try {
      const user = await User.findById(userId).select('-password');
      
      if (!user) {
        return {
          success: false,
          message: 'User not found'
        };
      }

      return {
        success: true,
        user: {
          id: (user._id as any).toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          createdAt: user.createdAt
        },
        message: 'Profile retrieved successfully'
      };
    } catch (error) {
      console.error('Get profile error:', error);
      return {
        success: false,
        message: 'Failed to retrieve profile'
      };
    }
  }

  /**
   * Update user password
   */
  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        return {
          success: false,
          message: 'User not found'
        };
      }

      // Verify current password
      const isCurrentPasswordValid = await user.comparePassword(currentPassword);
      
      if (!isCurrentPasswordValid) {
        return {
          success: false,
          message: 'Current password is incorrect'
        };
      }

      // Update password (will be hashed by pre-save middleware)
      user.password = newPassword;
      await user.save();

      return {
        success: true,
        message: 'Password changed successfully'
      };
    } catch (error) {
      console.error('Change password error:', error);
      return {
        success: false,
        message: 'Failed to change password'
      };
    }
  }
}

// Export a singleton instance
export const authService = new AuthService();