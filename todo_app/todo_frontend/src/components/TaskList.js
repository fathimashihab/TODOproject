
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css';

const TaskList = ({ onTaskUpdated }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks/');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleUpdate = async (taskId) => {
    try {
      await axios.put(`http://localhost:8000/api/tasks/${taskId}/`, { completed: true });
      console.log('Task updated successfully');
      // Optionally, you can refresh the task list here
      if (onTaskUpdated) {
        onTaskUpdated();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

    const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}/`);
      // Refresh the task list after deletion
      const response = await axios.get('http://localhost:8000/api/tasks/');
      setTasks(response.data);
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <h1>Task List</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.due_date}</td>
              <td>{task.completed ? 'Completed' : 'Not Completed'}</td>
              <td>
                {!task.completed && (
                  <button onClick={() => handleUpdate(task.id)}>Update</button>
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList; 
