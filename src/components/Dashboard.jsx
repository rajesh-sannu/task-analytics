import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import TaskManager from "../pages/TaskManager";
import TaskDetails from "../pages/TaskDetailsModal";

const Dashboard = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setRecentTasks(storedTasks.slice(-5));
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleClickOutside = (e) => {
    if (
      sidebarOpen &&
      !e.target.closest("aside") &&
      !e.target.closest('button[aria-label="Open sidebar"]')
    ) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-teal-700 via-blue-800 to-indigo-900 text-white relative">
  {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
     <aside
        className={`
          fixed inset-y-0 left-0 bg-gray-900 shadow-lg z-50 w-64
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Menu</h3>
          <button
            className="text-3xl text-gray-300 hover:text-white"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>
        <ul className="px-2 py-4 space-y-2">
          <li
            className="flex items-center gap-2 cursor-pointer hover:bg-indigo-700 rounded px-3 py-2 transition-colors duration-200"
            onClick={() => setShowHistory(!showHistory)}
            title="History"
          >
            <FaHistory size={20} />
            History
          </li>
        </ul>
        {showHistory && (
          <div className="px-6 py-4 border-t border-gray-700">
            <h4 className="text-lg font-semibold mb-2">Recent Tasks</h4>
            {recentTasks.length === 0 ? (
              <p className="text-gray-400">No recent tasks</p>
            ) : (
              <ul className="space-y-1 max-h-48 overflow-y-auto">
                {recentTasks.map((task, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between bg-gray-800 rounded px-3 py-2 text-sm hover:bg-gray-700 transition"
                  >
                    <span className="truncate">{task.text}</span>
                    <span
                      className={`font-semibold ${
                        task.completed ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {task.completed ? "done" : "Not done "}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </aside>
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center px-4 sm:px-6 md:px-6 lg:px-6 py-4 border-b border-gray-700 bg-gray-900 sticky top-0 z-40">
          <button
            className="text-3xl text-gray-300 hover:text-white mr-4"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            ☰
          </button>
          <h1 className="text-2xl font-bold text-white flex-grow text-center">
            Welcome to your Dashboard 🖥️
          </h1>
          <div className="flex items-center space-x-4 ml-4">
            <Link to="/analytics">
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium shadow transition whitespace-nowrap">
                View Analytics
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white font-medium shadow transition whitespace-nowrap"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 flex items-center justify-center overflow-auto">
          <div className="w-full max-w-2xl">
            <TaskManager />
            <TaskDetails />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
