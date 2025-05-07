import React from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for better UI styling

const Home = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
      <h1 className="display-4 fw-bold mb-4 text-primary">Welcome to Task Manager</h1>
      <div className="d-flex gap-3">
        <Link href="/login">
          <button className="btn btn-primary btn-lg">Login</button>
        </Link>
        <Link href="/register">
          <button className="btn btn-success btn-lg">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;