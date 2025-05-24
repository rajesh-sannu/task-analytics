import React, { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null); 

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    const taskData = {
      text: newTask,
      completed: false,
      startDate,
      endDate,
      createdAt: new Date().toISOString(),
    };

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = taskData;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, taskData]);
    }

    setNewTask("");
    setStartDate("");
    setEndDate("");
  };

  const handleEdit = (index) => {
    const task = tasks[index];
    setNewTask(task.text);
    setStartDate(task.startDate || "");
    setEndDate(task.endDate || "");
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    setEditIndex(null);
  };

  const handleToggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        newTask,
        setNewTask,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        filter,
        setFilter,
        editIndex,
        handleAddTask,
        handleEdit,
        handleDelete,
        handleToggleComplete,
        selectedTask,
        setSelectedTask, 
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
