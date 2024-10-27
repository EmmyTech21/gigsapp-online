import React from 'react';

interface ReviewProps {
  formData: {
    taskTitle: string;
    category: string;
    location: string;
    description: string;
    budget: string;
    date: string;
  };
}

const Review: React.FC<ReviewProps> = ({ formData }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Review</h2>
      <div className="mb-4">
        <strong>Task Title:</strong> {formData.taskTitle}
      </div>
      <div className="mb-4">
        <strong>Category:</strong> {formData.category}
      </div>
      <div className="mb-4">
        <strong>Location:</strong> {formData.location}
      </div>
      <div className="mb-4">
        <strong>Description:</strong> {formData.description}
      </div>
      <div className="mb-4">
        <strong>Budget:</strong> {formData.budget}
      </div>
      <div className="mb-4">
        <strong>Date:</strong> {formData.date}
      </div>
    </div>
  );
};

export default Review;
