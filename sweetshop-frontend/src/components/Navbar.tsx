import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white p-4 shadow">
      <div className="flex items-center gap-6">

        {/* Dashboard visible to all logged-in users */}
        {token && (
          <Link
            to="/dashboard"
            className="hover:text-blue-400 transition"
          >
            Dashboard
          </Link>
        )}

        {/* Admin Panel only for ADMIN */}
        {token && userRole === "admin" && (
          <Link
            to="/admin"
            className="hover:text-blue-400 transition"
          >
            Admin Panel
          </Link>
        )}
      </div>

      {/* Logout Button */}
      {token && (
        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
