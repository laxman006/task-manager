import { Task } from '../types';

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  return (
    <div className="p-4 border rounded shadow-sm bg-white hover:shadow-md transition">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-sm">Status: <span className="font-medium">{task.status}</span></p>
      <p className="text-sm">Priority: <span className="font-medium">{task.priority}</span></p>
      <p className="text-sm">Due: <span className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</span></p>
    </div>
  );
}