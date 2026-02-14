import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = await registerUser({ name, email, password });
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      setError(data.message || "Registration failed");
    }
  };

  return (
    // eslint-disable-next-line
    <div
      // eslint-disable-next-line
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100"
    >
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Register</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          {/* eslint-disable-next-line */}
          <button
            type="submit"
            // eslint-disable-next-line
            className="w-full bg-linear-to-r from-teal-800 to-teal-900 text-white p-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-slate-600">
          Already have an account?{" "}
          <a href="/login" className="text-teal-800 hover:text-teal-900 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
