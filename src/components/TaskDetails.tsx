import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

interface Task {
  title: string;
  description: string;
  location: string;
  budget: string;
  status: string;
  image?: string;
  completedDate?: string;
}

interface TaskDetailsProps {
  task: Task | null;
  onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a loading delay when task data is loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [task]);

  if (isLoading || !task) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <ClipLoader size={50} color={"#ffffff"} loading={true} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
        {/* Close Button */}
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 font-bold text-lg">
            &times;
          </button>
        </div>

        {/* Header */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm">Today, {new Date().toLocaleDateString()}</p>
          <h2 className="text-2xl font-bold text-gray-800">Live project overview</h2>
        </div>

        {/* Task Details */}
        <div className="bg-gray-100 rounded-lg p-6">
          <p className="text-red-600 font-bold text-right mb-4">{task.status}</p>
          <div className="mb-4">
            <h3 className="font-semibold">Task Title</h3>
            <p>{task.title}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Task Description</h3>
            <p>{task.description}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Location</h3>
            <p>{task.location}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Budget</h3>
            <p>NGN {task.budget}</p>
          </div>
          {task.image && (
            <div className="mb-4">
            <h3 className="font-semibold">Image</h3>
            <img src={task.image} alt="Task" className="rounded-lg mt-2 w-full h-40 object-cover" />
            </div>
          )}
          <div className="mb-4">
            <h3 className="font-semibold">Date Completed</h3>
            <p>{task.completedDate || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
