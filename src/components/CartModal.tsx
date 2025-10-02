// src/components/CartModal.tsx 
import React, { useContext, useState } from "react";
import Modal from "./Modal";
import { CartContext } from "../contexts/CartContext";
import apiService from "./services/apiService";
import { Notify } from "notiflix/build/notiflix-notify-aio";

interface CartItem {
  id: string;
  title: string;
  price: number;
  image?: string;
  qty: number;
}

interface CartModalProps {
  onClose: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const cartContext = useContext(CartContext);
  const mockCartItems: CartItem[] = [];
  
  const items = cartContext?.items || mockCartItems;
  const removeItem = cartContext?.removeItem || (() => console.log('Remove item'));
  const clearCart = cartContext?.clearCart || (async () => console.log('Clear cart'));
  const getTotalPrice = cartContext?.getTotalPrice || (() => 0);

  const isEmpty = items.length === 0;

  // Checkout handler with backend integration
  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      console.log('Creating order:', {
        items: items,
        total: getTotalPrice(),
        timestamp: new Date()
      });
      
      // Call backend to create order (this also clears the cart in backend)
      const response = await apiService.createOrder();
      
      console.log('✅ Order created successfully:', response);
      
      // Clear local cart state
      if (cartContext?.clearCart) {
        await cartContext.clearCart();
      }
      
      setIsProcessing(false);
      setOrderComplete(true);
      
      Notify.success('Order placed successfully!', {
        position: 'right-top',
        timeout: 3000,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      setIsProcessing(false);
      
      if (error instanceof Error) {
        if (error.message.includes('Authorization required') || error.message.includes('Authentication required')) {
          Notify.failure('Your session has expired. Please log in again.', {
            position: 'right-top',
            timeout: 3000,
          });
        } else if (error.message.includes('Cart is empty')) {
          Notify.warning('Your cart is empty. Add items before checking out.', {
            position: 'right-top',
            timeout: 3000,
          });
        } else {
          Notify.failure(error.message || 'Failed to place order. Please try again.', {
            position: 'right-top',
            timeout: 3000,
          });
        }
      } else {
        Notify.failure('An unexpected error occurred. Please try again.', {
          position: 'right-top',
          timeout: 3000,
        });
      }
    }
  };

  // Handle clear cart button
  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart();
    }
  };

  // Show order success
  if (orderComplete) {
    return (
      <Modal onClose={onClose} ariaLabel="Order Success">
        <div className="text-center py-8 max-w-md">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed!</h2>
            <p className="text-gray-600 mb-6">Thank you for your purchase. Your order is being processed.</p>
          </div>
          
          <button
            onClick={onClose}
            className="px-8 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </Modal>
    );
  }

  // Show simple checkout form
  if (showCheckout) {
    return (
      <Modal onClose={() => setShowCheckout(false)} ariaLabel="Checkout">
        <div className="max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Checkout</h2>
          
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-3 text-gray-900">Order Summary</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-700">
                  <span>{item.title} × {item.qty}</span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-3 pt-3 flex justify-between font-bold text-gray-900">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          {/* Simple Form */}
          <div className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
              required
            />
            <input
              type="text"
              placeholder="Full name"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
              required
            />
            <input
              type="text"
              placeholder="Card number"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowCheckout(false)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
            >
              Back to Cart
            </button>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                      fill="none"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                `Place Order - $${getTotalPrice().toFixed(2)}`
              )}
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  // Show empty cart
  if (isEmpty) {
    return (
      <Modal onClose={onClose} ariaLabel="Shopping Cart">
        <div className="text-center py-8">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5-6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h7a2 2 0 002-2v-.5M16 11V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Your Cart</h2>
          <p className="text-gray-600 mb-6">Your cart is empty</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </Modal>
    );
  }

  // Show cart contents
  const total = getTotalPrice();

  return (
    <Modal onClose={onClose} ariaLabel="Shopping Cart">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Your Cart ({items.length} items)</h2>
        
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="w-16 h-16 bg-white rounded flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                <p className="font-semibold text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
                <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                className="text-gray-700 bg-white px-3 py-2 text-sm border border-gray-300 rounded hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold text-gray-900">
              Total: ${total.toFixed(2)}
            </span>
          </div>
          
          <div className="flex gap-3 flex-wrap">
            <button 
              onClick={handleClearCart}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 bg-white text-gray-700 transition-colors"
            >
              Clear Cart
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors rounded"
            >
              Continue Shopping
            </button>
            <button 
              onClick={() => setShowCheckout(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}