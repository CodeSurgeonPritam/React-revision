import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu for mobile view
  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo/Brand */}
        <Link to="/" className="text-white text-2xl font-semibold">
          MyJobApp
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/jobs" className="text-white hover:text-gray-300">Job Listings</Link>
          <Link to="/role-access" className="text-white hover:text-gray-300">Role Access</Link>
          <Link to="/schedule" className="text-white hover:text-gray-300">Schedule</Link>
          <Link to="/analytics" className="text-white hover:text-gray-300">Analytics</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={handleMenuToggle}
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (conditional rendering) */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 p-4">
          <Link to="/dashboard" className="block text-white py-2">Home</Link>
          <Link to="/jobs" className="block text-white py-2">Job Listings</Link>
          <Link to="/role-access" className="block text-white py-2">Role Access</Link>
          <Link to="/schedule" className="block text-white py-2">Schedule</Link>
          <Link to="/analytics" className="block text-white py-2">Analytics</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
