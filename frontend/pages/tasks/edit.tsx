import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const EditTask = () => {
    const router = useRouter();
    const { id } = router.query;

    const [task, setTask] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            // Fetch the task details
            fetch(`/api/tasks/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setTask(data);
                    setLoading(false);
                })
                .catch((err) => console.error(err));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });
            if (res.ok) {
                router.push('/tasks');
            } else {
                console.error('Failed to update task');
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Edit Task</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Task</button>
            </form>
        </div>
    );
};

export default EditTask;