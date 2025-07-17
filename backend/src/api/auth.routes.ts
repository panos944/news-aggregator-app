import { Router } from "express";
import { validateLogin, validatePasswordChange, validateRegistration } from "../middleware/validation.middleware";
import { authController } from "../controllers/auth.comtroller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router()

/** 
 *  Public Routes (no authentication required)
 * */


// POST /api/auth/register
// Register a new user account

router.post("/register",
    validateRegistration, // First: validate input data
    authController.register // Then: create the account
);


// POST /login/auth/login
// Login an existing user
router.post("/login",
    validateLogin, // First: validate input data
    authController.login // Then: authenticate and login user
);


/**
 * PROTECTED ROUTES (athentication required)
 */


// GET /api/auth/profile
// Get current user's profile
router.get("/profile",
    authenticateToken, // First: verift JWT token
    authController.getProfile // Then: return user's data
) 


// PUT /api/auth/change-password
// Changer a user's password
router.put("/change-password",
    authenticateToken, // First: verift JWT token
    validatePasswordChange, // Then: validate new password
    authController.changePassword // Finnaly: update password
)

export default router;