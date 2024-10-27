import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaTasks, FaEdit, FaEnvelope, FaCog, FaHome } from 'react-icons/fa';
import logo from '../images/GiGs_Logo-without back ground 1@2x.png';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-50 h-screen p-6">
      {/* Logo Section */}
      <div className="mb-10">
        <img src={logo} alt="Gigs App Logo" className="w-32 h-auto mx-auto mb-4" />
        <h2 className="text-center text-xl font-bold">Gigs App</h2>
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="space-y-6">
          <li>
            <Link to="/" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <FaHome className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/user" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <FaUser className="mr-3" />
              Profile
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <FaTasks className="mr-3" />
              My Tasks
            </Link>
          </li>
          <li>
            <Link to="/post-task" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <FaEdit className="mr-3" />
              Post a Task
            </Link>
          </li>
          <li>
            <Link to="/messages" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <FaEnvelope className="mr-3" />
              Messages
              {/* Notification Badge */}
              <span className="ml-2 text-xs text-red-500 font-semibold">2</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <FaCog className="mr-3" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      {/* Notification Section */}
      <div className="mt-12 bg-white shadow rounded-lg p-4">
        <h3 className="text-sm font-semibold">Notification</h3>
        <p className="text-xs text-gray-600 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet.
        </p>
        <button className="text-blue-500 text-xs mt-4">Read more</button>
      </div>
    </div>
  );
};

export default Sidebar;
