import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await loginUser({ email, password });
    console.log(data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
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
          <button
            type="submit"
            className="w-full bg-linear-to-r from-teal-800 to-teal-900 text-white p-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-slate-600">
          Don't have an account?{" "}
          <a href="/register" className="text-teal-800 hover:text-teal-900 font-semibold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
