import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { TaskProvider } from "./context/TaskContext"; 
import TaskAnalytics from "./pages/TaskAnalytics";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
  }, []);

  return (
    <Router>
      <TaskProvider>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard"element={
              isLoggedIn ? (
            <Dashboard setIsLoggedIn={setIsLoggedIn} />
              ) : (
             <Navigate to="/" />
              )
            }
          />
          <Route
  path="/analytics"
  element={isLoggedIn ? <TaskAnalytics /> : <Navigate to="/" />}
/>
        </Routes>
      </TaskProvider>
    </Router>
  );
}

export default App;
