import { useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      await api.post('/auth/register', { email, password, name });
      router.push('/login');
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Registration failed';
      console.error('Registration failed:', message);
      setErrorMessage(message);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4 font-bold">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2 w-full rounded"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 w-full rounded"
          required
        />
        {errorMessage && (
          <div className="text-red-600 text-sm">{errorMessage}</div>
        )}
        <button
          type="submit"
          className="bg-secondary text-white p-2 rounded hover:bg-green-700 w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
}
