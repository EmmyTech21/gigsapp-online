import React from 'react';
import Dashboard from '../components/Dashboard';
import Sidebar from '../components/Sidebar';

 
const DashboardPage: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
  
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
