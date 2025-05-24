import React from "react";
import { useTaskContext } from "../context/TaskContext";

const TaskManager = () => {
  const {
    newTask,
    setNewTask,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filter,
    setFilter,
    editIndex,
    filteredTasks,
    handleAddTask,
    handleEdit,
    handleDelete,
    handleToggleComplete,
    setSelectedTask,
  } = useTaskContext();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
      <div className="p-6">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Task Manager 📝
        </h2>
        <div className="space-y-4 mb-8">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a task"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
              />
            </div>
          </div>

          <button
            onClick={handleAddTask}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            {editIndex !== null ? "Update Task" : "Add Task"}
          </button>
        </div>
        <div className="flex justify-center space-x-2 mb-6">
          {["all", "completed", "incomplete"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                filter === type
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No tasks found. Add a task to get started!
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleToggleComplete(index);
                    }}
                    className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span
                    className={`flex-1 truncate cursor-pointer ${
                      task.completed ? "line-through text-gray-400" : "text-gray-700"
                    }`}
                    onClick={() => setSelectedTask(task)}
                    title="Click to view details"
                  >
                    {task.text}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(index);
                    }}
                    className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                    className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
