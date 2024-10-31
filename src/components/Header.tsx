// src/components/Header.tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { FaUser, FaEnvelope, FaBell } from 'react-icons/fa';
import { searchTasks, selectSearchResults, addBid } from '../features/tasks/tasksSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(selectSearchResults);
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim() !== '') {
      dispatch(searchTasks(e.target.value));
    }
  };

  const handleBid = (taskId: string) => {
    dispatch(addBid({ taskId }));
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={query}
          onChange={handleSearch}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex space-x-4 items-center">
        <FaUser className="text-gray-600 h-6 w-6 hover:text-gray-900" />
        <FaEnvelope className="text-gray-600 h-6 w-6 hover:text-gray-900" />
        <FaBell className="text-gray-600 h-6 w-6 hover:text-gray-900 relative">
          <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500" />
        </FaBell>
      </div>
      {query && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg max-h-64 overflow-y-auto">
          {searchResults.length ? (
            searchResults.map((task) => (
              <div key={task.id} className="p-4 border-b flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{task.title}</h4>
                  <p className="text-sm text-gray-500">{task.description} - ${task.budget}</p>
                </div>
                <button
                  onClick={() => handleBid(task.id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                  Bid
                </button>
              </div>
            ))
          ) : (
            <p className="p-4 text-center text-gray-500">No tasks found</p>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
