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
      <div className="mb-4">
        <p><strong>Task Title:</strong> {formData.title}</p>
        <p><strong>Description:</strong> {formData.description}</p>
        <p><strong>Location:</strong> {formData.location}</p>
        <p><strong>Budget:</strong> {formData.budget}</p>
        <p><strong>Deadline:</strong> {formData.date}</p>
      </div>
      <div className="flex justify-between">
        <button className="bg-gray-200 p-2 rounded" onClick={onBack}>Go back</button>
        <button className="bg-blue-500 text-white p-2 rounded" onClick={onProceed}>Proceed</button>
      </div>
    </div>
  );
};

export default TaskOverview;
