
import { Link } from 'react-router-dom';

const EmailSent = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 shadow-md rounded text-center">
        <h2 className="text-2xl font-bold mb-4">Email Sent</h2>
        <p>We have sent a mail to your email address with a code to authenticate your account.</p>
        <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block">
          Go to mail
        </Link>
      </div>
    </div>
  );
};

export default EmailSent;
