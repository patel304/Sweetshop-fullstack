/**
 * Admin Authorization Middleware
 * ------------------------------
 * Ensures that only users with the "admin" role can access certain routes.
 * This middleware depends on `authMiddleware` because that middleware
 * attaches `req.user` after verifying the JWT token.
 */

import { Request, Response, NextFunction } from "express";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;

  if (user?.role !== "admin") {
    return res.status(403).json({ error: "Admin only" });
  }

  next();
};
