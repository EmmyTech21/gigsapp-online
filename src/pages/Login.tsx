import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice'; // Import login from authSlice

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { email, password };
    
    // Dispatch login action
    dispatch(login(userData))
      .unwrap()
      .then(() => {
        navigate('/dashboard'); // Redirect after successful login
      })
      .catch((error) => {
        alert('Login failed: ' + error.message);
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
            Don't Have An Account? <a href="/signup" className="text-blue-500">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
