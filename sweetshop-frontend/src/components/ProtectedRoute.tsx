/**
 * ProtectedRoute Component
 * ------------------------
 * Ensures that only authenticated users can access specific pages.
 *
 * Behavior:
 * - If no token is found → redirect user to /login
 * - If the user is authenticated → show protected content
 *
 * Usage Example:
 * <ProtectedRoute>
 *    <Dashboard />
 * </ProtectedRoute>
 */

import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  // If user is not logged in, redirect to login page
  if (!token) return <Navigate to="/login" replace />;

  // Allow access
  return children;
}
