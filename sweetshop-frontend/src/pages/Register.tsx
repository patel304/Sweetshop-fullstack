import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:4000/api/auth/register", {
        name,
        email,
        password,
      });

      window.location.href = "/login";
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Register
        </button>

        <p className="text-sm mt-2 text-center">
          Already have an account?
          <a href="/login" className="text-blue-600 ml-1">Login</a>
        </p>
      </form>
    </div>
  );
}
