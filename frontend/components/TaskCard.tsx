import { Task } from '../types';

interface Props {
  task: Task;
  onDelete?: () => void;
  onEdit?: () => void;
}

export default function TaskCard({ task, onDelete, onEdit }: Props) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text">{task.description}</p>
        <p>
          <strong>Status:</strong> {task.status}
        </p>
        <p>
          <strong>Priority:</strong>{' '}
          <span
            className={`badge ${
              task.priority === 'high'
                ? 'bg-danger'
                : task.priority === 'medium'
                ? 'bg-warning text-dark'
                : 'bg-success'
            }`}
          >
            {task.priority}
          </span>
        </p>
        <p>
          <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <div className="d-flex justify-content-end gap-2">
          {onEdit && (
            <button className="btn btn-primary btn-sm" onClick={onEdit}>
              Edit
            </button>
          )}
          {onDelete && (
            <button className="btn btn-danger btn-sm" onClick={onDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
