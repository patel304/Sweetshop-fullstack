/**
 * Application Entry Point
 * -----------------------------------------
 * This file sets up:
 * - React root rendering
 * - BrowserRouter for routing
 * - All public + protected routes
 * 
 * Route Structure:
 *  - "/"           → Public Home Page
 *  - "/login"      → Login Page
 *  - "/register"   → Registration Page
 *  - "/dashboard"  → Protected (user must be logged in)
 *  - "/admin"      → Protected (only admin users)
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";

// Route Guards
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdmin from "./components/ProtectedAdmin";

import "./index.css";

// Render React app
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>

      {/* ---------- Public Routes ---------- */}
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ---------- Protected User Dashboard ---------- */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ---------- Admin-Only Routes ---------- */}
      <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <AdminPanel />
          </ProtectedAdmin>
        }
      />

    </Routes>
  </BrowserRouter>
);
