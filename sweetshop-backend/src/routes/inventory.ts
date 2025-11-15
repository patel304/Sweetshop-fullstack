/**
 * Inventory Routes
 * --------------------------------------
 * Handles purchasing and restocking sweets.
 * Requires authentication for all routes.
 * Restocking requires admin access.
 */

import { Router } from "express";
import {
  purchaseSweet,
  restockSweet,
} from "../controllers/inventoryController";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = Router();

/**
 * Purchase a sweet
 * - Any logged-in user can purchase
 */
router.post("/:id/purchase", authMiddleware, purchaseSweet);

/**
 * Restock a sweet
 * - Only admin users can restock
 */
router.post("/:id/restock", authMiddleware, adminMiddleware, restockSweet);

export default router;
