import { Request, Response } from "express";
import { authService } from "../services/auth.service";

class AuthController {

    // POST /api/auth/register
    // Register a new user
    async register (req: Request, res: Response) : Promise<void> {
        try {
            // Validation middleware has already run
            const {email, password, firstName, lastName} = req.body;

            const result = await authService.register({
                email,
                password,
                firstName,
                lastName
            });

            if (result.success) {
                res.status(201).json(result)
            } else {
                res.status(400).json(result)
            }
        } catch (error) {
            console.error("Resiter controller error", error)
            res.status(500).json ({
                success: false,
                message: "Server error during registration"
            })
        }
    }


    // Post /api/auth/login
    // Login existing user
    async login(req: Request, res: Response) : Promise<void> {
        try {
            const {email, password} = req.body;

            const result = await authService.login({email, password});

            if (result.success) {
                res.status(200).json(result)
            } else {
                res.status(401).json(result)
            }
        } catch (error) {
            console.error("Login controller error", error)
            res.status(500).json ({
                success: false,
                message: 'Server error during login'
            })
        }
    }


    // GET /api/auth/profile
    // Gets current user's profile (requires authentication)
    async getProfile(req: Request, res: Response) : Promise<void> {
        try {
            const userId = req.userPayload?.userId;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated' 
                });
                return 
            }

            const result = await authService.getUserProfile(userId)

            if (result.success) {
                res.status(200).json(result)
            } else {
                res.status(404).json(result)
            }
        } catch (error) {
            console.error("Get profile controller error", error)
            res.status(500).json({
                success: false,
                message: 'Server error retrieving profile'
            })
        }
    }


    // PUT /api/auth/change-password
    async changePassword(req: Request, res: Response) : Promise<void> {
        try {
            const userId = req.userPayload?.userId;
            const {currentPassword, newPassword} = req.body;

            if(!userId) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated'
                })
            return;
            }

            const result = await authService.changePassword(userId, currentPassword, newPassword)

            if (result.success) {
                res.status(200).json(result);
              } else {
                res.status(400).json(result);
              }
            } catch (error) {
              console.error('Change password controller error:', error);
              res.status(500).json({
                success: false,
                message: 'Server error changing password'
              });
        }
    }
}

export const authController = new AuthController();