import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the Authorization header
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      console.log('JWT Token Sent in Request:', token); // Log the token being sent
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

// Fetch tasks from the backend
export async function fetchTasks() {
  try {
    const response = await api.get('/tasks'); // Automatically includes the Authorization header
    return response.data; // Return the fetched tasks
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; // Rethrow the error for the caller to handle
  }
}

// Demo login function
export function demoLogin() {
  try {
    const token = 'demo-token'; // Simulate a token for demo login
    localStorage.setItem('token', token); // Store the token in localStorage
    console.log('Demo login successful. Token set:', token); // Log the token for debugging
    window.location.href = '/dashboard'; // Redirect to the dashboard
  } catch (error) {
    console.error('Error during demo login:', error);
    throw error; // Rethrow the error for the caller to handle
  }
}
// Function to create a new task
export async function createTask(taskData: { title: string; description: string }) {
  try {
    const response = await api.post('/tasks', taskData); // Send a POST request to create a new task
    console.log('Task created successfully:', response.data); // Log the response for debugging
    return response.data; // Return the created task data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error creating task:', error.response?.data || error.message);
    } else {
      console.error('Error creating task:', error);
    }
    throw error; // Rethrow the error for the caller to handle
  }
}