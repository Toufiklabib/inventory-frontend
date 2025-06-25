// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full sm:w-1/3 text-center sm:text-left">
            <p className="text-lg font-semibold">My Application</p>
            <p className="text-sm">© 2025 My Company. All rights reserved.</p>
          </div>
          <div className="w-full sm:w-1/3 mt-4 sm:mt-0 text-center sm:text-right">
            <ul className="flex justify-center sm:justify-end space-x-6">
              <li><a href="/about" className="text-sm hover:text-indigo-400">About</a></li>
              <li><a href="/privacy" className="text-sm hover:text-indigo-400">Privacy Policy</a></li>
              <li><a href="/contact" className="text-sm hover:text-indigo-400">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
