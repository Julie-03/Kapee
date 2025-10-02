// src/components/Layout.tsx
import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from './Header';
import { navigationItems } from '../data/sampleData';
import { CartContext } from '../contexts/CartContext';

const Layout: React.FC = () => {
  // ✅ Use CartContext instead of local state
  const cartContext = useContext(CartContext);

  const handleAddToCart = (productId: number) => {
    if (cartContext?.addItem) {
      // You'll need to get the full product data somehow
      // For now, I'll create a basic item - you should modify this
      // to get the actual product data from your products list
      const cartItem = {
        id: productId.toString(),
        title: `Product ${productId}`, // Replace with actual product name
        price: 29.99, // Replace with actual product price
        image: '', // Replace with actual product image
      };
      
      cartContext.addItem(cartItem, 1);
      console.log(`✅ Product ${productId} added to CartContext`);
    } else {
      console.log(`❌ CartContext not available for product ${productId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fixed at top */}
      <Header 
        navigationItems={navigationItems}
        // ✅ Get cart count from context instead of local state
        cartItemCount={cartContext?.getTotalItems() || 0}
      />

      {/* Main Content Area - Full width, no sidebar */}
      <main className="w-full">
        {/* Content Area - This changes based on routes */}
        <div className="w-full">
          <Outlet context={{ handleAddToCart }} />
        </div>

        {/* Footer - Full width */}
        <footer className="bg-gray-900 text-white py-8 w-full">
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
                  <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                  <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                  <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                  <li><Link to="/shipping" className="text-gray-400 hover:text-white">Shipping</Link></li>
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
      </main>
    </div>
  );
};

export default Layout;