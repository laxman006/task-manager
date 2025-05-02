import { useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/login', { email, password });
      router.push('/dashboard');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button className="bg-primary text-white p-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}