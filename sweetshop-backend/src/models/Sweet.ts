/**
 * Sweet Model
 * --------------------------------------
 * Defines the schema for sweet items stored
 * in the database along with optional image.
 */

import { Schema, model, Document } from "mongoose";

export interface ISweet extends Document {
  name: string;
  category: string;
  price: number;
  quantity: number;
  image?: string;
}

const sweetSchema = new Schema<ISweet>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Sweet = model<ISweet>("Sweet", sweetSchema);
