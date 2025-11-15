/**
 * Sweets Controller
 * -----------------
 * Handles CRUD and search operations for sweets.
 * These endpoints are used by both admin and normal users.
 *
 * Contains:
 *  - Create sweet (admin)
 *  - Fetch all sweets
 *  - Search sweets
 *  - Update sweet (admin)
 *  - Delete sweet (admin)
 */

import { Request, Response } from "express";
import { Sweet } from "../models/Sweet";

/**
 * @desc Create a new sweet
 * @route POST /api/sweets
 * @access Protected (Admin only)
 *
 * Creates and stores a new sweet in the database.
 * The request must include name, category, price, quantity, and optional image URL.
 */
export const createSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.create(req.body);
    return res.status(201).json(sweet);
  } catch (err) {
    console.error("Create Sweet Error:", err);
    return res.status(500).json({ error: "Server error while creating sweet" });
  }
};

/**
 * @desc Get all sweets
 * @route GET /api/sweets
 * @access Protected
 *
 * Returns every sweet present in the shop.
 * This endpoint is used by Dashboard and Admin Panel.
 */
export const getSweets = async (_: Request, res: Response) => {
  try {
    const sweets = await Sweet.find();
    return res.status(200).json(sweets);
  } catch (err) {
    console.error("Fetch Sweets Error:", err);
    return res.status(500).json({ error: "Failed to fetch sweets" });
  }
};

/**
 * @desc Search sweets by name, category, or price range
 * @route GET /api/sweets/search
 * @access Protected
 *
 * Query Options:
 *  - name: partial or full match (case-insensitive)
 *  - category: exact match
 *  - minPrice & maxPrice: numeric range
 */
export const searchSweets = async (req: Request, res: Response) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const query: any = {};

    if (name) query.name = { $regex: name as string, $options: "i" };
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) }),
      };
    }

    const sweets = await Sweet.find(query);
    return res.status(200).json(sweets);
  } catch (err) {
    console.error("Search Sweet Error:", err);
    return res.status(500).json({ error: "Error searching sweets" });
  }
};

/**
 * @desc Update sweet details
 * @route PUT /api/sweets/:id
 * @access Protected (Admin only)
 *
 * Updates a sweet's name, category, price, quantity, or image.
 */
export const updateSweet = async (req: Request, res: Response) => {
  try {
    const updated = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.error("Update Sweet Error:", err);
    return res.status(500).json({ error: "Error updating sweet" });
  }
};

/**
 * @desc Delete a sweet
 * @route DELETE /api/sweets/:id
 * @access Protected (Admin only)
 *
 * Removes a sweet from the inventory completely.
 */
export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const deleted = await Sweet.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    return res.status(200).json({ message: "Sweet deleted successfully" });
  } catch (err) {
    console.error("Delete Sweet Error:", err);
    return res.status(500).json({ error: "Error deleting sweet" });
  }
};
