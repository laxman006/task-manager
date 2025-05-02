export interface Task {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    status: 'todo' | 'in-progress' | 'done';
    createdBy?: string;
    assignedTo?: string;
  }

  