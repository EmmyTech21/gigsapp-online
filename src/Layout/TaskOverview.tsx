import React from 'react';

interface TaskOverviewProps {
  formData: {
    title: string;
    description: string;
    location: string;
    budget: string;
    date: string;
  };
  onProceed: () => void;
  onBack: () => void;
}

const TaskOverview: React.FC<TaskOverviewProps> = ({ formData, onProceed, onBack }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Task Overview</h2>
      
      {/* Display each field with a fallback for empty values */}
      <div className="mb-4 space-y-2">
        <p><strong>Task Title:</strong> {formData.title || 'Not provided'}</p>
        <p><strong>Description:</strong> {formData.description || 'Not provided'}</p>
        <p><strong>Location:</strong> {formData.location || 'Not provided'}</p>
        <p><strong>Budget:</strong> {formData.budget ? `$${formData.budget}` : 'Not provided'}</p>
        <p><strong>Deadline:</strong> {formData.date || 'Not provided'}</p>
      </div>
      
      <div className="flex justify-between mt-6">
        <button 
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold p-2 rounded transition duration-200"
          onClick={onBack}
        >
          Go Back
        </button>
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded transition duration-200"
          onClick={onProceed}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default TaskOverview;
