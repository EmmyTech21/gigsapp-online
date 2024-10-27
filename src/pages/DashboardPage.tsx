import React from 'react';
import Dashboard from '../components/Dashboard';
import Sidebar from '../components/Sidebar';
// import PrivateRoute from '../components/PrivateRoute';
import { Route, Routes } from 'react-router-dom';
// import PostTask from '../Layout/PostTask';
// import Header from '../components/Header';
 
const DashboardPage: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
     
      <Routes>
     {/* <Route
        path="post-task"
        element={
          <PrivateRoute>
            <PostTask />
          </PrivateRoute>
        }
      /> */}
      </Routes>
 
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
