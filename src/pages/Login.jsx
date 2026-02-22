import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);
      const res = await API.post("/auth/login", { email, password });

      login(res.data);
      toast.success("Welcome back 👋");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-black to-gray-950">

      {/* LEFT BRANDING (Hidden on Mobile) */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 text-white px-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          AI Mock Interview Pro
        </h1>

        <p className="text-gray-400 max-w-md text-center leading-relaxed">
          Practice real technical interviews with AI-powered feedback,
          exam-mode timer, voice answers, and performance analytics.
        </p>

        <div className="mt-10 text-gray-500 text-sm">
          🚀 Crack your next interview with confidence.
        </div>
      </div>

      {/* RIGHT LOGIN CARD */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-xl p-8 sm:p-10 rounded-3xl w-full max-w-md shadow-2xl border border-gray-700">

          {/* Mobile Branding */}
          <div className="md:hidden text-center mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              AI Mock Interview Pro
            </h1>
            <p className="text-gray-400 text-xs mt-2">
              Practice. Improve. Succeed.
            </p>
          </div>

          <h2 className="text-2xl sm:text-3xl text-white font-bold text-center mb-8">
            🔐 Login
          </h2>

          <input
            className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full mb-6 p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.02] hover:shadow-lg"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-gray-400 mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-400 hover:text-purple-300 font-medium transition"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}