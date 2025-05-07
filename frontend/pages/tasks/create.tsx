import React, { useState } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../utils/api'; // Import your API utility

const CreateTask: React.FC = () => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const newTask = {
            title: taskName,
            description,
            dueDate,
            createdBy: 'me', // Replace 'me' with the actual user ID or identifier
            assignedTo: 'me', // Replace 'me' with the actual user ID or identifier
            status: 'todo', // Default status
        };

        try {
            // Send the task to the backend
            await api.post('/tasks', newTask);
            console.log('Task Created:', newTask);

            // Redirect to the dashboard or reload tasks
            router.push('/dashboard'); // Redirect to the dashboard
        } catch (err) {
            console.error('Error creating task:', err);
            setError('Failed to create task. Please try again.');
        }

        // Clear the form
        setTaskName('');
        setDescription('');
        setDueDate('');
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Create Task</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="mb-3">
                    <label htmlFor="taskName" className="form-label">Task Name:</label>
                    <input
                        type="text"
                        id="taskName"
                        className="form-control"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">Due Date:</label>
                    <input
                        type="date"
                        id="dueDate"
                        className="form-control"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTask;