

interface DetailsProps {
  formData: {
    title: string;
    description: string;
    location: string;
    budget: string;
    date: string;
  };
  updateFormData: (newData: Partial<DetailsProps['formData']>) => void;
  onProceed: () => void;
}

const Details: React.FC<DetailsProps> = ({ formData, updateFormData, onProceed }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Enter Task Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Task Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter task title"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter task description"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter task location"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Budget</label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter budget"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Deadline</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <button
        onClick={onProceed}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Proceed
      </button>
    </div>
  );
};

export default Details;
