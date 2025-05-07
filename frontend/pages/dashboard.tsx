import { useEffect, useState } from 'react';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import TaskEditModal from '../components/TaskEditModal';
import api from '../utils/api';
import { Task } from '../types';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'created' | 'overdue'>('created'); // Removed 'assigned' filter
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const loadTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (e) {
      console.error('Delete failed', e);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const now = new Date();
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'created') {
      return true; // Show **all** created tasks
    }
    if (filter === 'overdue') {
      return new Date(task.dueDate) < now && task.status !== 'done'; // Show only overdue tasks
    }
    return true;
  });

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Dashboard</h1>

      {/* Filter Options */}
      <div className="d-flex justify-content-center mb-4">
        <div className="btn-group">
          <button
            className={`btn ${filter === 'created' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('created')}
          >
            Created by Me
          </button>
          <button
            className={`btn ${filter === 'overdue' ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => setFilter('overdue')}
          >
            Overdue
          </button>
        </div>
      </div>

      {/* Task Form */}
      <div className="card mb-4 shadow">
        <div className="card-body">
          <TaskForm onTaskCreated={loadTasks} />
        </div>
      </div>

      {/* Task Cards Grid */}
      <div className="row">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-muted">No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <div className="col-md-4 mb-4" key={task._id}>
              <TaskCard
                task={task}
                onDelete={() => deleteTask(task._id)}
                onEdit={() => setEditingTask(task)}
              />
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editingTask && (
        <TaskEditModal task={editingTask} onClose={() => setEditingTask(null)} onUpdated={loadTasks} />
      )}
    </div>
  );
}