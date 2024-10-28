import React, { useState, ChangeEvent } from 'react';
import { useAppDispatch } from '../app/hooks';
import { FaShoppingCart, FaHome, FaTruck, FaMapMarkerAlt, FaHandshake } from 'react-icons/fa';
import { postTask } from '../features/tasks/tasksSlice';
import Details from '../Layout/Details';
import TaskOverview from './TaskOverview';
import DocumentUpload from './DocumentUpload';
import SuccessPopup from './SuccessPopup';
import { Link, useNavigate } from 'react-router-dom';
import Review from './Review';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; 

const PostTask: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    budget: '',
    date: '',
    image: null as File | null,
  });

  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Invalid file type. Please upload an image.');
        return;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        setErrorMessage('Image size exceeds 5MB. Please upload a smaller image.');
        return;
      }
      updateFormData({ image: file });
      setErrorMessage(''); 
    }
  };

  const handleProceed = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

 const handlePostTask = async () => {
  // Validation
  if (!formData.title || !formData.description || !formData.location || !formData.budget || !formData.date) {
    setErrorMessage('All fields are required. Please complete the form.');
    return;
  }

  const taskData = new FormData();
  taskData.append('title', formData.title);
  taskData.append('description', formData.description);
  taskData.append('location', formData.location);
  taskData.append('budget', formData.budget);
  taskData.append('date', formData.date);
  if (formData.image) {
    taskData.append('image', formData.image);
  }

  try {
    const result = await dispatch(postTask(taskData)).unwrap();
    if (result) {
      setStep(5); 
    }
  } catch (error) {
    setErrorMessage('Failed to post task. Please try again later.');
    console.error('Error in postTask:', error); 
  }
};


  const handleReturnToDashboard = () => {
    navigate('/dashboard');
  };

  const progressPercentage = (step / 4) * 100;

  return (
    <div className="p-6">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Task Categories Section */}
        <div className="w-full md:w-2/3 p-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow hover:shadow-lg transition duration-300 h-48">
            <FaShoppingCart className="text-4xl text-blue-500 mb-2" />
            <Link to="post-task"><p className="text-center font-semibold">Errands & Shopping</p></Link>
          </div>
          <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow hover:shadow-lg transition duration-300 h-48">
            <FaHome className="text-4xl text-blue-500 mb-2" />
            <p className="text-center font-semibold">Household Services</p>
          </div>
          <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow hover:shadow-lg transition duration-300 h-48">
            <FaTruck className="text-4xl text-blue-500 mb-2" />
            <p className="text-center font-semibold">Transportation & Delivery</p>
          </div>
          <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow hover:shadow-lg transition duration-300 h-48">
            <FaMapMarkerAlt className="text-4xl text-blue-500 mb-2" />
            <p className="text-center font-semibold">Event Support</p>
          </div>
          <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow hover:shadow-lg transition duration-300 h-48">
            <FaHandshake className="text-4xl text-blue-500 mb-2" />
            <p className="text-center font-semibold">Business Support</p>
          </div>
        </div>

        {/* Task Steps Section */}
        <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md ml-4">
          <h3 className="text-lg font-semibold mb-4">Task Steps</h3>
          <div className="space-y-4">
            <div className={step >= 1 ? 'text-blue-500 font-semibold' : 'text-gray-600'}>
              <h4 className="font-semibold">1. Task Type</h4>
              <p className="text-sm">Choose the type of task you want to post.</p>
            </div>
            <div className={step >= 2 ? 'text-blue-500 font-semibold' : 'text-gray-600'}>
              <h4 className="font-semibold">2. Task Detail</h4>
              <p className="text-sm">Provide more information about the task.</p>
            </div>
            <div className={step >= 3 ? 'text-blue-500 font-semibold' : 'text-gray-600'}>
              <h4 className="font-semibold">3. Document Upload</h4>
              <p className="text-sm">Upload any necessary documents for the task.</p>
            </div>
            <div className={step === 4 ? 'text-blue-500 font-semibold' : 'text-gray-600'}>
              <h4 className="font-semibold">4. Summary</h4>
              <p className="text-sm">Review the details of your task.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && <div className="text-red-500 text-center my-4">{errorMessage}</div>}

      {/* Conditional Rendering of Steps */}
      <div className="mt-6">
        {step === 1 && <Details formData={formData} updateFormData={updateFormData} onProceed={handleProceed} />}
        {step === 2 && (
          <div>
            <DocumentUpload onBack={handleBack} onProceed={handleProceed} />
            <input type="file" onChange={handleImageChange} />
          </div>
        )}
        {step === 3 && <TaskOverview formData={formData} onProceed={handleProceed} onBack={handleBack} />}
        {step === 4 && <Review formData={formData} />}

        {step === 5 && <SuccessPopup onReturn={handleReturnToDashboard} />}
      </div>

      {step === 4 && (
        <button
          onClick={handlePostTask}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Confirm & Post Task
        </button>
      )}
    </div>
  );
};

export default PostTask;
