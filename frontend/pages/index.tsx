import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h1 className="text-3xl font-bold">Welcome to Task Manager</h1>
        <p className="mt-4 text-gray-600">Manage your tasks efficiently and stay organized.</p>
      </main>
    </div>
  );
}