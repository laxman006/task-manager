import { useState } from 'react';
import api from '../utils/api';
import { TaskCreateDto } from '../src/types';

export default function TaskForm({ onTaskCreated }: { onTaskCreated: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: TaskCreateDto = {
      title,
      description,
      status: 'todo',
      priority: 'medium',
      dueDate: new Date().toISOString(),
    };

    await api.post('/tasks', newTask);
    setTitle('');
    setDescription('');
    onTaskCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="border p-2 rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-primary text-white p-2 rounded hover:bg-blue-700">
        Create Task
      </button>
    </form>
  );
}
