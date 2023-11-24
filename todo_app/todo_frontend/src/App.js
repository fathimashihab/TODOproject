// src/App.js
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div>
      <h1>ToDo List App</h1>
      <TaskList onEdit={handleEdit} />
      <TaskForm onSubmit={handleCancelEdit} initialTask={editingTask} />
    </div>
  );
};

export default App;
