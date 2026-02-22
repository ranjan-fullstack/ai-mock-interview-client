import { useContext, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative">

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-64
          bg-black/40 backdrop-blur-md border-r border-gray-700 p-6
          transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h2 className="text-xl font-bold mb-8">🚀 AI Mock</h2>

        <nav className="flex flex-col gap-4">
          <Link
            to="/dashboard"
            onClick={closeSidebar}
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
            onClick={closeSidebar}
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
            onClick={closeSidebar}
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

      {/* MAIN SECTION */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="flex justify-between items-center px-6 md:px-8 py-4 bg-black/30 border-b border-gray-700">

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>

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

        {/* PAGE CONTENT */}
        <main className="p-6 md:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}