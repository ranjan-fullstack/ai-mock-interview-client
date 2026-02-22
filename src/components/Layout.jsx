import { useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-black/40 backdrop-blur-md border-r border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-8">🚀 AI Mock</h2>

        <nav className="flex flex-col gap-4">
          <Link
            to="/dashboard"
            className={`px-4 py-2 rounded-lg transition ${
              location.pathname === "/dashboard"
                ? "bg-purple-600"
                : "hover:bg-gray-700"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/interview"
            className={`px-4 py-2 rounded-lg transition ${
              location.pathname === "/interview"
                ? "bg-purple-600"
                : "hover:bg-gray-700"
            }`}
          >
            Take Interview
          </Link>

          <Link
            to="/analytics"
            className={`px-4 py-2 rounded-lg transition ${
              location.pathname === "/analytics"
                ? "bg-purple-600"
                : "hover:bg-gray-700"
            }`}
          >
            Analytics
          </Link>
        </nav>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="flex justify-between items-center px-8 py-4 bg-black/30 border-b border-gray-700">
          <div className="font-semibold text-lg">
            👋 {user?.name}
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>

      </div>
    </div>
  );
}