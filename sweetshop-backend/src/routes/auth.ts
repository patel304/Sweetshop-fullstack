/**
 * Auth Routes
 * --------------------------------------
 * Handles user registration and login.
 * These routes interact with authController.
 */

import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = Router();

// Register a new user
router.post("/register", registerUser);

// Login user and return JWT token
router.post("/login", loginUser);

export default router;
