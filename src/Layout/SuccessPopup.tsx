import React from 'react';

interface SuccessPopupProps {
  onReturn: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ onReturn }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full text-center">
        <h3 className="text-lg font-semibold mb-4 text-green-500">Success</h3>
        <p className="mb-4">Task has been posted successfully!</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onReturn}>Return to Dashboard</button>
      </div>
    </div>
  );
};

export default SuccessPopup;
