import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Retrieve the last used email from localStorage on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("lastEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      sessionStorage.setItem("access_token", "dummy_token");
      localStorage.setItem("lastEmail", email); // Save email for future suggestions
      navigate("/");
      window.location.reload();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <div className="relative mb-4">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            autoComplete="email"
          />
        </div>
        
        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            autoComplete="current-password"
          />
        </div>
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full font-semibold hover:bg-blue-600 transition-all">
          Login
        </button>
        
        <p className="text-gray-600 text-sm text-center mt-4">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
