import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../features/auth/authSlice';
import { login } from '../features/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { email, password };

    dispatch(login(userData))
      .unwrap()
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error: string) => {
        alert('Login failed: ' + error);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Login</h2>
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
          Login
        </button>
        <div className="text-center mt-4">
          <p>
            Don't Have An Account? <Link to="/sign-up" className="text-blue-500">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
