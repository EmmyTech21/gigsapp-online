import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Footer from '../components/Footer';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Dashboard from '../components/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import PostTask from '../Layout/PostTask';
import UserProfile from '../components/UserProfile';
import DashboardPage from '../pages/DashboardPage';

const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/footer" element={<Footer />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
       <Route
        path="user"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        } />
      <Route
        path="/post-task"
        element={
          <PrivateRoute>
            <PostTask />
          </PrivateRoute>
        }

      />

      
    </Routes>
  );
};

export default AllRoutes;
