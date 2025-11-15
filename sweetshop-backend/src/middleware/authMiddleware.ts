/**
 * Authentication Middleware
 * -------------------------
 * Verifies the JWT token sent in the Authorization header.
 * If valid, attaches the decoded user data to `req.user`.
 */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};
