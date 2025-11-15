/**
 * Sweet Routes
 * -----------------------------------------
 * Handles CRUD operations for sweets and
 * supports searching by name, category, and price.
 *
 * Note:
 * - Creating, updating, and deleting require authentication.
 * - Deleting requires admin access.
 */

import { Router } from "express";
import {
  createSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
} from "../controllers/sweetsController";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = Router();

/**
 * Create a new sweet (protected)
 */
router.post("/", authMiddleware, createSweet);

/**
 * Get all sweets
 */
router.get("/", getSweets);

/**
 * Search sweets by name/category/price
 */
router.get("/search", searchSweets);

/**
 * Update a sweet (protected)
 */
router.put("/:id", authMiddleware, updateSweet);

/**
 * Delete a sweet (admin-only)
 */
router.delete("/:id", authMiddleware, adminMiddleware, deleteSweet);

export default router;
