// src/components/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { NavItem } from '../types/index';
import LoginModal from './login';
import RegistrationModal from './RegisterForm';

interface HeaderProps {
  navigationItems: NavItem[];
  cartItemCount?: number;
}

const Header: React.FC<HeaderProps> = ({ navigationItems, cartItemCount = 0 }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // Add this state

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleAccountClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // Add handlers for register modal
  const handleOpenRegisterModal = () => {
    setIsLoginModalOpen(false); // Close login modal if open
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="bg-yellow-500 text-black py-2">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm font-medium">Free shipping on orders over $50! 📦</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">kapee.</h1>
            </div>

            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="w-full flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 px-4 py-2 border border-gray-300 bg-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600 transition-colors duration-200"
                >
                  Search
                </button>
              </form>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={handleAccountClick}
                className="bg-white shadow hidden sm:flex items-center space-x-1 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >  
                <span className="text-sm">Account</span>
              </button>

              <button className="bg-white shadow hidden sm:flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <span></span>
                <span className="text-sm">Wishlist</span>
              </button>

              <button className="bg-white shadow flex items-center space-x-1 text-gray-700 hover:text-gray-900 relative">
                <span className="text-sm hidden sm:block">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
                <span className="text-xl">☰</span>
              </button>
            </div>
          </div>

          <div className=" md:hidden mt-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className=" flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600">
                🔍
              </button>
            </form>
          </div>
        </div>

        <nav className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="hidden md:flex space-x-8 py-4">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className="text-gray-700 hover:text-yellow-600 transition-colors duration-200 font-medium"
                  >
                    {item.label}
                    {item.hasDropdown && <span className="ml-1">▼</span>}
                  </Link>
                </li>
              ))}
            </ul>

            {isMobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-200">
                <ul className="space-y-2">
                  {navigationItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-gray-700 hover:text-yellow-600 transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleAccountClick();
                      }}
                      className="block py-2 text-gray-700 hover:text-yellow-600 transition-colors duration-200"
                    >
                      Account
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={handleCloseLoginModal}
        onOpenRegister={handleOpenRegisterModal} // Pass the function to open register modal
      />
      
      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={isRegisterModalOpen} 
        onClose={handleCloseRegisterModal}
        onOpenLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </>
  );
};

export default Header;