import { Request, Response } from "express";
import { User, IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 *
 * This function handles the registration of a new user.
 * It checks if an email already exists, hashes the password,
 * stores the user in the database, and returns basic user info.
 */
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    // Check if account with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    // Hash password before saving to DB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const user: IUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Return only necessary user details
    return res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });

  } catch (err) {
    console.error("Error in registerUser:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * @desc Login user and return JWT token
 * @route POST /api/auth/login
 * @access Public
 *
 * This function validates user credentials, compares passwords,
 * generates a JWT token, and sends the user role with the response.
 */
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user: IUser | null = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ error: "Invalid credentials" });

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid credentials" });

    // Generate JWT containing user ID and role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "6h" }
    );

    // Return token + user info (role used in frontend for admin access)
    return res.json({
      token,
      role: user.role,
      email: user.email,
      name: user.name,
    });

  } catch (err) {
    console.error("Error in loginUser:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
