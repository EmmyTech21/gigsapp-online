import React, { useState } from 'react';
import Details from '../Layout/Details';
import Review from '../Layout/Review';

interface FormData {
  taskTitle: string;
  category: string;
  location: string;
  description: string;
  budget: string;
  date: string;
}

const PostTask: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    taskTitle: '',
    category: '',
    location: '',
    description: '',
    budget: '',
    date: '',
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrevious = () => setStep(prev => prev - 1);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData({ ...formData, ...newData });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInfo formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Details formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Review formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      {/* Progress Indicator */}
      <div className="flex justify-between items-center mb-6">
        <div className={`w-full h-1 rounded-full ${step >= 1 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
        <div className={`w-full h-1 rounded-full ${step >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
        <div className={`w-full h-1 rounded-full ${step >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
      </div>

      {/* Step Content */}
      {renderStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={handlePrevious}
          >
            Previous
          </button>
        )}
        {step < 3 && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded ml-auto"
            onClick={handleNext}
          >
            Next
          </button>
        )}
        {step === 3 && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded ml-auto"
            onClick={() => alert('Task Posted Successfully!')}
          >
            Confirm
          </button>
        )}
      </div>
    </div>
  );
};

export default PostTask;
