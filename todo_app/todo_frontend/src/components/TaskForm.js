
import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';

const TaskForm = ({ onTaskAdded }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    due_date: '',
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/tasks/', taskData);
      console.log('Task added successfully');
      setShowNotification(true);

      // Optionally, you can refresh the task list here
      if (onTaskAdded) {
        onTaskAdded();
      }

      // Reset the form data
      setTaskData({
        title: '',
        description: '',
        due_date: '',
      });

      // Hide the notification after a delay (e.g., 3 seconds)
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={taskData.title} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={taskData.description} onChange={handleInputChange}></textarea>
        </label>
        <br />
        <label>
          Due Date:
          <input type="date" name="due_date" value={taskData.due_date} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Add Task</button>

        {showNotification && (
          <div className="notification">
            Task added successfully! Please Refresh
          </div>
        )}
      </form>
    </div>
  );
};

export default TaskForm;
