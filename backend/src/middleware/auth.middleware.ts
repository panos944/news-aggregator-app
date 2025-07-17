import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractToken, JWTPayload } from '../utils/jwt.utils';
import User, { IUser } from '../models/User';

// Extend Express Request type to include user information
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      userPayload?: JWTPayload;
    }
  }
}

/**
 * Middleware to authenticate requests using JWT tokens
 * This middleware will run before protected routes
 */
export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Extract token from Authorization header
    const token = extractToken(req.headers.authorization);
    
    if (!token) {
      res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
      return;
    }

    // Verify the token
    const payload = verifyToken(token);
    
    if (!payload) {
      res.status(401).json({ 
        success: false, 
        message: 'Invalid or expired token.' 
      });
      return;
    }

    // Find the user in the database
    const user = await User.findById(payload.userId).select('-password');
    
    if (!user || !user.isActive) {
      res.status(401).json({ 
        success: false, 
        message: 'User not found or inactive.' 
      });
      return;
    }

    // Attach user info to request object for use in route handlers
    req.user = user;
    req.userPayload = payload;
    
    // Continue to next middleware/route handler
    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during authentication.' 
    });
  }
};

/**
 * Middleware to check if user has admin role
 * Use this after authenticateToken middleware
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.userPayload || req.userPayload.role !== 'admin') {
    res.status(403).json({ 
      success: false, 
      message: 'Access denied. Admin role required.' 
    });
    return;
  }
  next();
};

/**
 * Optional middleware - sets user info if token is provided but doesn't require it
 * Useful for routes that work differently for logged-in vs anonymous users
 */
export const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = extractToken(req.headers.authorization);
    
    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        const user = await User.findById(payload.userId).select('-password');
        if (user && user.isActive) {
          req.user = user;
          req.userPayload = payload;
        }
      }
    }
    
    next();
  } catch (error) {
    // Don't fail the request if optional auth fails
    console.error('Optional auth middleware error:', error);
    next();
  }
};