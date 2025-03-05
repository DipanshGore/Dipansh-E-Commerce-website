import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Retrieve last used email (if user attempted login but wasn't registered)
  useEffect(() => {
    const savedEmail = localStorage.getItem("lastEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    if (name.length < 3) {
      setError("Name must be at least 3 characters long");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    const newUser = { name, email, password };
    sessionStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("lastEmail", email); // Save for login suggestions

    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Register</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="relative mb-4">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div className="relative mb-4">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
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
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            autoComplete="new-password"
          />
        </div>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg w-full font-semibold hover:bg-green-600 transition-all">
          Register
        </button>

        <p className="text-gray-600 text-sm text-center mt-4">
          Already have an account? <a href="/login" className="text-green-500 hover:underline">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
