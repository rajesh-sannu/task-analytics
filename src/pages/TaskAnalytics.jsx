import React from "react";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const COLORS = ["#4ade80", "#f87171"];

const TaskAnalytics = () => {
  const { tasks } = useTaskContext();
  const navigate = useNavigate();

  const completed = tasks.filter(t => t.completed).length;
  const incomplete = tasks.length - completed;

  const pieData = [
    { name: "Completed", value: completed },
    { name: "Incomplete", value: incomplete },
  ];

  const barData = tasks.reduce((acc, task) => {
    const day = task.createdAt.split("T")[0];
    if (!acc[day]) acc[day] = { date: day, completed: 0, incomplete: 0 };
    if (task.completed) {
      acc[day].completed += 1;
    } else {
      acc[day].incomplete += 1;
    }
    return acc;
  }, {});

  const barChartData = Object.values(barData).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-8">
      <h2 className="text-4xl font-semibold mb-10">Task Analytics</h2>

      <div className="flex flex-wrap justify-center gap-12 w-full max-w-6xl">
        <div className="w-72 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={{ fill: "white" }}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                wrapperClassName="bg-gray-800 text-white rounded shadow-lg p-2"
                contentStyle={{ backgroundColor: "#1f2937", borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full max-w-[600px] h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <XAxis dataKey="date" stroke="#9ca3af" tick={{ fill: 'white' }} />
              <YAxis stroke="#9ca3af" tick={{ fill: 'white' }} />
              <Tooltip
                wrapperClassName="bg-gray-800 text-white rounded shadow-lg p-2"
                contentStyle={{ backgroundColor: "#1f2937", borderRadius: '8px' }}
              />
              <Legend wrapperStyle={{ color: 'white' }} />
              <Bar dataKey="completed" fill="#4ade80" />
              <Bar dataKey="incomplete" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-12 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default TaskAnalytics;
