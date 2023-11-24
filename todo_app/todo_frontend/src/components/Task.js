
import React from 'react';
import '../style.css';

const Task = ({ task, onDelete }) => {
  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.due_date}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Task;
