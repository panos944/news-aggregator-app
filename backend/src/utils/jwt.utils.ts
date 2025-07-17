import { IUser } from "../models/User";
import jwt from "jsonwebtoken";


// Interface for the data we store in the JWT token
export interface JWTPayload {
    userId: string;
    email:string;
    role: string;
}


// Get JWT secret for the enviromental variables
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRE = process.env.JWT_EXPIRE

/**
 * Generate a JWT token for a user
 * @param user - The user object
 * @returns Signed JWT token
 */

export const generateToken = (user: IUser): string => {
    const payload: JWTPayload = {
      userId:( user._id as any).toString(),
      email: user.email,
      role: user.role
    };

    return jwt.sign(payload, JWT_SECRET!, {
        expiresIn: JWT_EXPIRE || "7d"
    } as jwt.SignOptions)
}

/**
 * Verify and decode a JWT token
 * @param token - The JWT token to verify
 * @returns Decoded payload or null if invalid
 */

export const verifyToken = (token: string): JWTPayload | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET!) as unknown as JWTPayload
        return decoded
    } catch (error){
        console.error("JWT verification failed", error)
        return null
    }
}

/**
 * Extract token from Authorization header
 * @param authHeader - The Authorization header value
 * @returns Token string or null
 */

export const extractToken = (authHeader: string | undefined): string | null => {
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return null
    }
    return authHeader.substring(7); // removes the bearer prefix
}