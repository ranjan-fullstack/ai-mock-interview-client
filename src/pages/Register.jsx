import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await API.post("/auth/register", { name, email, password });
      login(res.data);
      toast.success("Registred Sucessfully");
      navigate("/dashboard");
    } catch {
      toast.error("Registration failed" );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl w-96 shadow-2xl border border-gray-700">
        <h2 className="text-2xl text-white font-bold text-center mb-6">
          🚀 Register
        </h2>

        <input
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white border border-gray-600"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white border border-gray-600"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white border border-gray-600"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-all"
        >
          Register
        </button>

        <p className="text-gray-400 mt-4 text-center">
          Already have account?{" "}
          <Link to="/login" className="text-purple-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}