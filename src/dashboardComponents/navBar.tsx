import React from 'react';

// Static NavBar Component - Creative Tim Style
const NavBar = () => {
  return (
    <div className="bg-white px-6 py-4 shadow-sm border-b border-gray-100">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-gray-600 text-sm font-medium">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="cursor-pointer hover:text-gray-700">Account</span>
            <span className="cursor-pointer hover:text-gray-700">Dashboard ▼</span>
            <span className="cursor-pointer hover:text-gray-700">Log out</span>
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"></div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;