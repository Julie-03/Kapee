// src/components/Layout.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { navigationItems } from '../data/sampleData';

const Layout: React.FC = () => {
  const [cartItems, setCartItems] = useState<number[]>([]);

  const handleAddToCart = (productId: number) => {
    setCartItems(prev => [...prev, productId]);
    console.log(`Product ${productId} added to cart`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fixed at top */}
      <Header 
        navigationItems={navigationItems}
        cartItemCount={cartItems.length}
      />

      {/* Main Layout Container */}
      <div className="main-layout">
        {/* Sidebar - Fixed on left */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="main-content">
          {/* Content Area - This changes based on routes */}
          <div className="content-area">
            <Outlet context={{ handleAddToCart }} />
          </div>

          {/* Footer - Fixed at bottom */}
          <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">kapee.</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Your trusted electronics store with the best deals on tech products.
                  </p>
                  <div className="flex space-x-4">
                    <span className="text-2xl">📧</span>
                    <span className="text-2xl">📱</span>
                    <span className="text-2xl">📘</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Shipping</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-4">Categories</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-gray-400 hover:text-white">Smart Watches</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Audio</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Accessories</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Chargers</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-4">Customer Service</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Returns</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Track Order</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-gray-400 mb-4 md:mb-0">
                  © 2024 Kapee Electronics. All rights reserved.
                </div>
                
                <div className="flex space-x-4 text-sm text-gray-400">
                  <span>💳 Visa</span>
                  <span>💳 Mastercard</span>
                  <span>💳 PayPal</span>
                  <span>💳 Apple Pay</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;