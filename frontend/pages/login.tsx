import { useState } from 'react';
import { useRouter } from 'next/router';
import api, { demoLogin } from '../utils/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.access_token); // Save the JWT token
      router.push('/dashboard'); // Redirect to dashboard
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Login failed';
      console.error('Login failed:', message);
      setErrorMessage(message);
    }
  };

  const handleDemoLogin = async () => {
    setErrorMessage('');
    try {
      const response = await demoLogin(); // Call the demoLogin function
      console.log('Demo login response:', response); // Log the response for debugging
      router.push('/dashboard'); // Redirect to the dashboard
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Demo login failed';
      console.error('Demo login failed:', message);
      setErrorMessage(message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
        </form>
        <button onClick={handleDemoLogin} className="btn btn-secondary w-100">Demo Login</button>
        <p className="text-center mt-3">
          Don't have an account? <a href="/register" className="text-primary">Register</a>
        </p>
      </div>
    </div>
  );
}