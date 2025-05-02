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
