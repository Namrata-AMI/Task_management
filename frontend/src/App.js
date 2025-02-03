import React, { useState, useEffect } from "react";
import './App.css';

const Url = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editId, setEditId] = useState(null); 

  // Fetch tasks 
  useEffect(() => {
    fetch(Url)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log("Error in fetching ", err));
  }, []);

  // Add new Task
  const addTask = async () => {
    if (editId) {

      // Edit  task
      const updatedTask = { title, description, dueDate };
      const res = await fetch(`${Url}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      const data = await res.json();
      setTasks(tasks.map((task) => (task._id === editId ? data : task)));
      setEditId(null); // Reset 
    } else {
      // Add new task
      const newTask = { title, description, dueDate };
      const res = await fetch(Url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const data = await res.json();
      setTasks([...tasks, data]);
    }

    // Clear input fields
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`${Url}/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  // Edit Task
  const editTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setEditId(task._id); // Set the task ID 
  };

  return (
    <div className="app-container">
      <h1>Task Manager</h1>

      {/* Input Fields */}
      <div className="input-container">
        <input
          placeholder="Task Title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      {/* Add or Edit Task Button */}
      <button className="add-task-btn" onClick={addTask}>
        {editId ? "Edit Task" : "Add Task"}
      </button>
      <br></br>
      <br></br>

      {/* Task List */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.description} (Due: {task.dueDate})
            <button onClick={() => editTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
