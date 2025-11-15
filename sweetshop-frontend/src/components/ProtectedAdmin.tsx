/**
 * ProtectedAdmin Component
 * ------------------------
 * This route guard ensures that:
 * 1. User is logged in (token must exist)
 * 2. Logged-in user has the "admin" role
 *
 * If not:
 *  - Unauthenticated users → redirected to /login
 *  - Non-admin authenticated users → redirected to /dashboard
 *
 * Usage:
 * <ProtectedAdmin>
 *    <AdminPanel />
 * </ProtectedAdmin>
 */

import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedAdminProps {
  children: ReactNode;
}

export default function ProtectedAdmin({ children }: ProtectedAdminProps) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If no token → user is not logged in
  if (!token) return <Navigate to="/login" replace />;

  // If token exists but user is not an admin
  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  // Authorized admin → allow access
  return children;
}
