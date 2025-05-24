import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Registration successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 px-4">
      <form
        className="w-full max-w-sm bg-teal-900/30 backdrop-blur-md p-8 rounded-lg border-2 border-cyan-600 shadow-lg space-y-6"
        onSubmit={handleRegister}
      >
        <h2 className="text-3xl font-bold text-cyan-300 mb-6 drop-shadow">
          Register
        </h2>
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 rounded-md bg-slate-800 text-cyan-200 placeholder-cyan-400 border-2 border-cyan-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-2 rounded-md bg-slate-800 text-cyan-200 placeholder-cyan-400 border-2 border-cyan-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-violet-700 hover:bg-blue-700 text-white rounded-md font-medium transition-colors duration-300"
        >
          Register
        </button>
        <p className="text-sm text-cyan-300 mt-4">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer hover:text-blue-400"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
