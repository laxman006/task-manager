import { useEffect, useState } from 'react';
import { fetchTasks } from '../utils/api'; // Import the fetchTasks function
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { Task } from '../types';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks(); // Use the fetchTasks function
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks(); // Fetch tasks when the component mounts
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <TaskForm onTaskCreated={loadTasks} />
      <div className="grid grid-cols-1 gap-4 mt-6">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}
