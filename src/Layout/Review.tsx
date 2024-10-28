interface ReviewProps {
  formData: {
    title: string;
    location: string;
    description: string;
    budget: string;
    date: string;
    image: File | null;
  };
}

const Review: React.FC<ReviewProps> = ({ formData }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Review</h2>
      <div className="mb-4">
        <strong>Task Title:</strong> {formData.title}
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
      <div className="mb-4">
        <strong>Image:</strong> {formData.image && <img src={URL.createObjectURL(formData.image)} alt="Task" />}
      </div>
    </div>
  );
};

export default Review;
