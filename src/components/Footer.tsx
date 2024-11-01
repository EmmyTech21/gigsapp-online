
import { Link } from "react-router-dom";
import { FaLinkedin, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"; // Import the necessary icons
import logo from '../images/GiGs_Logo-without back ground 1@2x.png';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300">
      {/* Desktop view */}
      <div className="hidden md:flex justify-between items-start p-8 text-sm space-x-8">
        {/* Logo and Rights */}
        <div className="flex flex-col space-y-2">
          <img src="/path-to-logo.png" alt="Logo" className="h-12" />
          <span className="text-gray-600">© 2024 Gigs. All Rights Reserved</span>
        </div>

        {/* Links Section */}
        <div className="flex space-x-8">
          {/* Legal Section */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-gray-700">Legal</h3>
            <Link to="/privacy-policy" className="text-gray-600 hover:text-gray-800">Privacy Policy</Link>
            <Link to="/terms-conditions" className="text-gray-600 hover:text-gray-800">Terms and Conditions</Link>
          </div>
          {/* Company Section */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-gray-700">Company</h3>
            <Link to="/about-us" className="text-gray-600 hover:text-gray-800">About Us</Link>
            <Link to="/blog" className="text-gray-600 hover:text-gray-800">Blog</Link>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-gray-700">Subscribe</h3>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Email address"
              className="border border-gray-300 rounded-full px-4 py-2 mr-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition-colors">
              Sign Up Now
            </button>
          </form>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin className="text-blue-600 hover:text-blue-800 transition-colors" size={24} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebookF className="text-blue-600 hover:text-blue-800 transition-colors" size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter className="text-blue-600 hover:text-blue-800 transition-colors" size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram className="text-pink-600 hover:text-pink-800 transition-colors" size={24} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <FaYoutube className="text-red-600 hover:text-red-800 transition-colors" size={24} />
          </a>
        </div>
      </div>

      {/* Tablet and Mobile view */}
      <div className="md:hidden flex flex-col items-center p-6 text-sm space-y-4">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-10" />
        {/* Links */}
        <div className="flex flex-col space-y-4 text-center">
          {/* Legal Links */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-gray-700">Legal</h3>
            <Link to="/privacy-policy" className="text-gray-600 hover:text-gray-800">Privacy Policy</Link>
            <Link to="/terms-conditions" className="text-gray-600 hover:text-gray-800">Terms and Conditions</Link>
          </div>
          {/* Company Links */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-gray-700">Company</h3>
            <Link to="/about-us" className="text-gray-600 hover:text-gray-800">About Us</Link>
            <Link to="/blog" className="text-gray-600 hover:text-gray-800">Blog</Link>
          </div>
        </div>
        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter className="text-blue-600 hover:text-blue-800 transition-colors" size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram className="text-pink-600 hover:text-pink-800 transition-colors" size={24} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <FaYoutube className="text-red-600 hover:text-red-800 transition-colors" size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
