import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      email === storedUser.email &&
      password === storedUser.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="login-container min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-pink-500 px-4"
      id="login-container"
    >
      <form
        className="login-form w-full max-w-sm bg-white/10 backdrop-blur-lg p-6 rounded-lg border-2 border-fuchsia-500 shadow-2xl space-y-4"
        id="login-form"
        onSubmit={handleLogin}
      >
        <h1
          className="login-title text-3xl font-bold text-yellow-300 drop-shadow text-center mb-2"
          id="login-title"
        >
          Login
        </h1>
        <input
          id="email-input"
          className="input-field w-full px-4 py-2 rounded-md bg-black text-blue-300 placeholder-blue-200 border-2 border-sky-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id="password-input"
          className="input-field w-full px-4 py-2 rounded-md bg-black text-blue-300 placeholder-blue-200 border-2 border-sky-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          id="login-button"
          className="btn-submit w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium"
          type="submit"
        >
          Sign In
        </button>
      </form>

      <p className="register-text text-sm text-white-300 font-semibold text-center mt-4"id="register-text">
        If new user, register here
        <br />
      <Link
      className="register-link text-blue-500 font-semibold underline hover:text-blue-700 block mt-1"
      id="register-link"
      to="/register"
      >
      Click here
      </Link>
      </p>

    </div>
  );
};

export default Login;
