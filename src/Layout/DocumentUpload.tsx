import React, { useState } from 'react';

interface DocumentUploadProps {
  onBack: () => void;
  onProceed: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onBack, onProceed }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleProceedClick = () => {
    // Add conditional logic to proceed only if a file is selected
    if (file) {
      onProceed(); // Call the proceed function to advance the step
    } else {
      alert('Please upload a document before proceeding.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Upload Documents</h2>
      <p className="text-gray-600 mb-4">Attach any relevant documents for your task.</p>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <div className="flex space-x-4">
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
        >
          Back
        </button>
        <button
          onClick={handleProceedClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;
