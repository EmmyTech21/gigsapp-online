import React from 'react';

interface BasicInfoProps {
  formData: {
    taskTitle: string;
    category: string;
    location: string;
  };
  updateFormData: (newData: Partial<BasicInfoProps['formData']>) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ formData, updateFormData }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Basic Info</h2>
      <input
        type="text"
        placeholder="Task Title"
        className="border rounded w-full p-2 mb-4"
        value={formData.taskTitle}
        onChange={(e) => updateFormData({ taskTitle: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        className="border rounded w-full p-2 mb-4"
        value={formData.category}
        onChange={(e) => updateFormData({ category: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        className="border rounded w-full p-2 mb-4"
        value={formData.location}
        onChange={(e) => updateFormData({ location: e.target.value })}
      />
    </div>
  );
};

export default BasicInfo;
