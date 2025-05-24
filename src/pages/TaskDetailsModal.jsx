import React from "react";
import { useTaskContext } from "../context/TaskContext";

const TaskDetails = () => {
  const { selectedTask, setSelectedTask } = useTaskContext();

  if (!selectedTask) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setSelectedTask(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-details-title"
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
          onClick={() => setSelectedTask(null)}
          aria-label="Close task details"
        >
          ×
        </button>
        <h2
          id="task-details-title"
          className="text-xl font-semibold mb-4 text-gray-800"
        >
          Task Details
        </h2>
        <p className="mb-2 text-gray-700">
          <strong>Task Name:</strong> {selectedTask.text}
        </p>
        <p className="mb-2 text-gray-700">
          <strong>Start Date:</strong>{" "}
          {selectedTask.startDate ? selectedTask.startDate : "N/A"}
        </p>
        <p className="mb-2 text-gray-700">
          <strong>End Date:</strong> {selectedTask.endDate ? selectedTask.endDate : "N/A"}
        </p>
        <p className="text-gray-700">
          <strong>Status:</strong>{" "}
          {selectedTask.completed ? (
            <span className="text-green-600 font-semibold">Completed</span>
          ) : (
            <span className="text-red-600 font-semibold">Incomplete</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default TaskDetails;
