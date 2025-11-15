/**
 * Login Page
 * -------------------------
 * Allows a user to log into the Sweet Shop system.
 *
 * Features:
 *  - Login using email and password
 *  - Stores JWT token + role in localStorage
 *  - Redirects user based on role
 */

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // Redirect after login
      window.location.href = "/dashboard";

    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* Error message */}
        {error && <p className="text-red-600 mb-2">{error}</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>

        {/* Navigation */}
        <p className="text-sm mt-2 text-center">
          No account?
          <Link to="/register" className="text-blue-600 ml-1">Register</Link>
        </p>
      </form>

    </div>
  );
}
