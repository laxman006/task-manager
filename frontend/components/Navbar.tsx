import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="p-4 bg-primary text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <div className="space-x-4">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/login" className="hover:underline">
          Login
        </Link>
        <Link href="/register" className="hover:underline">
          Register
        </Link>
      </div>
    </nav>
  );
}