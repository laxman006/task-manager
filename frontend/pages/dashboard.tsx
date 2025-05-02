import { useEffect, useState } from 'react';
import api from '../utils/api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { Task } from '../types'; // ✅ Import Task type

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]); // ✅ Add type here

  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <TaskForm onTaskCreated={fetchTasks} />
      <div className="grid grid-cols-1 gap-4 mt-6">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}
