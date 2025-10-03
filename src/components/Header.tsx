// src/components/Header.tsx - COMPLETE UPDATED VERSION
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { NavItem } from '../types/index';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import LoginModal from './login';
import RegistrationModal from './RegisterForm';
import CartModal from './CartModal';

interface HeaderProps {
  navigationItems: NavItem[];
}

const Header: React.FC<HeaderProps> = ({ navigationItems }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Get authentication state
  const { isAuthenticated, user, logout } = useAuth();
  // Get cart state directly from CartContext
  const { getTotalItems } = useCart();
  const isAdmin = user?.role === 'admin' || user?.userRole === 'admin';
  const navigate = useNavigate();

  // Get live cart count
  const cartItemCount = getTotalItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleAccountClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      console.log('Logging out user...');
      
      // The cart will be automatically cleared from UI by CartContext
      // when it receives the logout event from AuthContext
      // Backend cart remains saved
      
      // Just call logout - AuthContext will handle everything
      logout();
      navigate('/');
      
      console.log('User logged out successfully - cart saved in database');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleOpenRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleCartClick = () => {
    console.log('Cart button clicked, isCartOpen:', isCartOpen);
    setIsCartOpen(!isCartOpen);
  };

  const handleCloseCart = () => {
    console.log('Closing cart');
    setIsCartOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="bg-yellow-500 text-black py-2">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm font-medium">Free shipping on orders over $50!</p>
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
              {/* Show Account/Login button only if not authenticated */}
              {!isAuthenticated && (
                <button 
                  onClick={handleAccountClick}
                  className="bg-white shadow hidden sm:flex items-center space-x-1 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >  
                  <span className="text-sm ">Login</span>
                </button>
              )}

              {/* Show user info and logout if authenticated */}
              {isAuthenticated && (
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-700">
                  <span>Hello, {user?.email?.split('@')[0]}</span>
                  <span className="text-gray-400">|</span>
                </div>
              )}

              <button 
                className="bg-white shadow flex items-center space-x-2 text-gray-700 hover:text-gray-900 relative px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={handleCartClick}
              >
                <span className="text-sm hidden sm:block">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Show logout button only if authenticated */}
              {isAuthenticated && (
                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="bg-yellow-500 shadow hidden sm:flex items-center space-x-1 text-white hover:bg-yellow-600 px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-sm">{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                </button>
              )}

              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
                <span className="text-xl">☰</span>
              </button>
            </div>
          </div>

          <div className="md:hidden mt-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Search for products..."
              />
              <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600">
                <p> Search</p>
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
                  
                  {/* Mobile auth buttons */}
                  {!isAuthenticated ? (
                    <li>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleAccountClick();
                        }}
                        className="block py-2 text-black bg-yellow-500 hover:text-yellow-600 transition-colors duration-200"
                      >
                        Login
                      </button>
                    </li>
                  ) : (
                    <li>
                      <div className="py-2 space-y-2">
                        <div className="text-gray-600 text-sm">Hello, {user?.email?.split('@')[0]}</div>
                        <button
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            handleLogout();
                          }}
                          disabled={isLoggingOut}
                          className="block py-2 text-black bg-yellow-500 hover:yellow-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoggingOut ? 'Logging out...' : 'Logout'}
                        </button>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={handleCloseLoginModal}
          onOpenRegister={handleOpenRegisterModal}
        />
      )}
      
      {/* Registration Modal */}
      {isRegisterModalOpen && (
        <RegistrationModal 
          isOpen={isRegisterModalOpen} 
          onClose={handleCloseRegisterModal}
          onOpenLogin={() => {
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true);
          }}
        />
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <CartModal onClose={handleCloseCart} />
      )}
   </>
  );
};

export default Header;