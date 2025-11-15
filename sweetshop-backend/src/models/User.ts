/**
 * User Model
 * --------------------------------------
 * Stores user account information including
 * authentication details and role (admin/user).
 */

import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
