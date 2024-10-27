import React from 'react';

interface ConfirmationPopupProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4 text-yellow-500">Confirmation</h3>
        <p className="mb-4">By clicking "Post Task", you agree to our terms and conditions for posting tasks.</p>
        <div className="flex justify-end space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded" onClick={onCancel}>Cancel</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onConfirm}>Post Task</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
