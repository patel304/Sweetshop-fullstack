import { Request, Response } from "express";
import { Sweet } from "../models/Sweet";

/**
 * @desc Purchase a sweet (reduces stock by 1)
 * @route POST /api/sweets/:id/purchase
 * @access Protected (Any logged-in user)
 *
 * This controller handles the purchase of a sweet.
 * It ensures the sweet exists, checks if stock is available,
 * decreases the quantity, saves the updated sweet, and returns the result.
 */
export const purchaseSweet = async (req: Request, res: Response): Promise<Response> => {
  try {
    const sweetId = req.params.id;

    // Check if sweet exists in DB
    const sweet = await Sweet.findById(sweetId);
    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    // Prevent purchase if stock is empty
    if (sweet.quantity <= 0) {
      return res.status(400).json({ error: "Out of stock" });
    }

    // Decrease quantity by 1
    sweet.quantity -= 1;
    await sweet.save();

    return res.status(200).json(sweet);

  } catch (err) {
    console.error("Error in purchaseSweet:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * @desc Restock a sweet (admin-only)
 * @route POST /api/sweets/:id/restock
 * @access Protected (Admin)
 *
 * This controller increases the stock of a sweet.
 * It validates the restock amount, checks that the sweet exists,
 * updates the quantity, and returns the updated document.
 */
export const restockSweet = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { amount } = req.body;
    const sweetId = req.params.id;

    // Validate input amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid restock amount" });
    }

    // Fetch sweet
    const sweet = await Sweet.findById(sweetId);
    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    // Update quantity
    sweet.quantity += amount;
    await sweet.save();

    return res.status(200).json(sweet);

  } catch (err) {
    console.error("Error in restockSweet:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
