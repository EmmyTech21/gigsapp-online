import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks'; 
import { RootState } from '../app/store';
import { signup } from '../features/auth/authSlice'; 
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); 
  const { loading, error, user } = useAppSelector((state: RootState) => state.auth); 

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading && formData.password === formData.confirmPassword) {
      dispatch(signup(formData))
        .unwrap()
        .catch((error: any) => {
          alert('Signup error: ' + (error.message || 'Unexpected error'));
        });
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/login'); // Navigate to login page after signup success
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              className="w-full px-3 py-2 border rounded"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="w-full px-3 py-2 border rounded"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              className="w-full px-3 py-2 border rounded"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-3 py-2 border rounded"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4">
              {typeof error === 'string' ? error : error?.message || "An unexpected error occurred"}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
