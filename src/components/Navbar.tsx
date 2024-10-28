import { useState } from 'react';
import { FaUser, FaEnvelope, FaBell, FaBars } from 'react-icons/fa';
import logo from '../images/GiGs_Logo-without back ground 1@2x.png';
import { Link } from 'react-router-dom';
const Navbar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="bg-[#fafafa] shadow-md p-4 z-50 relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Hamburger Menu Icon */}
        <button onClick={toggleSidebar} className="lg:hidden block">
          <FaBars className="text-gray-600 h-8 w-8" />
        </button>

        {/* Logo */}
        <img src={logo} alt="Gigs Logo" className="w-20 h-16" />

      
                 <nav className="lg:flex justify-around space-x-20 text-xl p-5 md:hidden sm:hidden ">
  <Link to="/services" className="text-gray-600
   bg-[#f8ffdd] hover:text-gray-900 p-4 rounded-full  shadow-lg shadow-sky-400">Our Services</Link>
  <Link to="/about" className="text-gray-600 bg-[#f8ffdd] p-4 rounded-full shadow-lg shadow-sky-400 hover:text-gray-900">About Us</Link>
  <Link to="/contact" className="text-gray-600 bg-[#f8ffdd] p-4 rounded-full hover:text-gray-900 shadow-lg shadow-sky-400">Contact Us</Link>
  {/* <Link to="/sign-up" className="text-gray-600 bg-[#f8ffdd] p-4 rounded-full  hover:text-gray-900 shadow-lg shadow-sky-400">Sign/Sign-up</Link> */}

</nav>

        {/* Icons */}
        {/* <div className="flex space-x-4 items-center">
          <FaUser className="text-gray-600 h-10 w-10 hover:text-gray-900" />
          <FaEnvelope className="text-gray-600 h-10 w-10 hover:text-gray-900" />
          <FaBell className="text-gray-600 h-10 w-10 hover:text-gray-900 relative">
            <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500" />
          </FaBell>
        </div> */}
      </div>

      {/* Sidebar (visible on small screens when toggled) */}
      <div
        className={`fixed top-0 left-0 h-full bg-white z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="p-4 flex justify-between items-center shadow-md">
          <img src={logo} alt="Gigs Logo" className="w-20 h-16" />
          <button onClick={toggleSidebar}>
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <div className="p-4">
          <input
            type="text"
            placeholder="Find tasks near you"
            className="border px-4 py-2 w-full mb-4"
          />
          <nav className="space-y-4">
            <a href="#" className="block text-gray-700 hover:text-blue-500">
              Sign Up / Log In
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-500">
              Our Services
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-500">
              About Us
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-500">
              Contact Us
            </a>
          </nav>
          <div className="mt-4 text-center">
            <p>&copy; 2024 Gigs. All Rights Reserved</p>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Navbar;
